// This service simulates a backend/database interaction using localStorage.
// In a production environment with Supabase connected, these functions would be replaced
// with Supabase client calls (e.g., supabase.from('bookings').select('*')).

import { v4 as uuidv4 } from 'uuid';
import { initialCounsellors } from '@/data/counsellors';

const STORAGE_KEYS = {
  BOOKINGS: 'sukoonBookings',
  COUNSELLORS: 'sukoonCounsellors',
  USERS: 'sukoonUsers',
};

// --- Bookings ---

export const getBookings = () => {
  const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
  return bookings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getBookingById = (id) => {
  const bookings = getBookings();
  return bookings.find((b) => b.id === id);
};

export const getBookingsByEmail = (email) => {
  const bookings = getBookings();
  return bookings.filter((b) => b.email.toLowerCase() === email.toLowerCase());
};

export const createBooking = (bookingData) => {
  const bookings = getBookings();
  const newBooking = {
    id: uuidv4(),
    ...bookingData,
    status: 'pending', // pending, confirmed, cancelled, completed
    paymentStatus: 'paid', // Simulating successful payment for now
    created_at: new Date().toISOString(),
    // Ensure payment details are stored if provided
    payment_method: bookingData.payment_method || 'card', 
    transaction_id: bookingData.transaction_id || `txn_${Math.random().toString(36).substr(2, 9)}`
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  return newBooking;
};

export const updateBookingStatus = (id, status) => {
  let bookings = getBookings();
  bookings = bookings.map((b) => (b.id === id ? { ...b, status } : b));
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  return bookings.find(b => b.id === id);
};

export const cancelBooking = (id, reason) => {
  let bookings = getBookings();
  bookings = bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled', cancellationReason: reason } : b));
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  return bookings.find(b => b.id === id);
};

// --- Counsellors ---

export const getCounsellors = () => {
  const localCounsellors = JSON.parse(localStorage.getItem(STORAGE_KEYS.COUNSELLORS) || '[]');
  // Merge initial static data with any locally added ones (if any)
  // De-duplication logic would go here in a real app
  return [...initialCounsellors, ...localCounsellors];
};

// --- Analytics / Stats ---

export const getDashboardStats = () => {
  const bookings = getBookings();
  
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => {
    // Extract price number from string like "$80" or "Free"
    const priceStr = b.price || "0";
    const price = priceStr === "Free" ? 0 : parseFloat(priceStr.replace('$', ''));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);
  
  const pending = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const cancelled = bookings.filter(b => b.status === 'cancelled').length;

  // Group by date for chart
  const bookingsByDate = bookings.reduce((acc, curr) => {
    const date = curr.created_at.split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(bookingsByDate).map(date => ({
    name: date,
    bookings: bookingsByDate[date]
  })).sort((a, b) => new Date(a.name) - new Date(b.name)).slice(-7); // Last 7 days

  return {
    totalBookings,
    totalRevenue,
    pending,
    confirmed,
    cancelled,
    chartData
  };
};