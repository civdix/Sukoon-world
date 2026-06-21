import React, { useState, useEffect, useContext } from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  DollarSign,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, color, prefix = "" }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">
          {prefix}
          {value}
        </h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const VITE_NODE_END_POINT =
    import.meta.env.VITE_NODE_END_POINT || "http://localhost:5000/api";
  const [activeTab, setActiveTab] = useState("analytics"); // analytics, bookings, users
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    pending: 0,
    confirmed: 0,
    chartData: [],
  });
  const [bookings, setBookings] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [bookingsRes, usersRes] = await Promise.all([
        axios.get(`${VITE_NODE_END_POINT}/admin/bookings`, { headers }),
        axios.get(`${VITE_NODE_END_POINT}/admin/users`, { headers }),
      ]);

      const data = bookingsRes.data;
      const usersData = usersRes.data;

      setBookings(data);
      setUsersList(usersData);

      let revenue = 0;
      let pending = 0;
      let confirmed = 0;

      // Calculate daily bookings for the chart
      const dailyCounts = {};

      data.forEach((b) => {
        revenue += b.amount / 100;
        if (b.status === "pending") pending++;
        if (b.status === "confirmed") confirmed++;

        // For chart data
        const date = new Date(b.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        dailyCounts[date] = (dailyCounts[date] || 0) + 1;
      });

      const chartData = Object.keys(dailyCounts)
        .map((date) => ({
          name: date,
          bookings: dailyCounts[date],
        }))
        .slice(-7); // Last 7 days

      setStats({
        totalRevenue: revenue,
        totalBookings: data.length,
        pending,
        confirmed,
        chartData,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/my-bookings");
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (loading) return;

    if (token && user?.role === "admin") {
      fetchData();
    } else if (user && user.role !== "admin") {
      navigate("/");
    } else if (!token || !user) {
      navigate("/my-bookings");
    }
  }, [token, user, loading]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(
        `${VITE_NODE_END_POINT}/admin/bookings/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast({
        title: "Status Updated",
        description: `Booking #${id.toString().slice(0, 8)} marked as ${newStatus}.`,
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      handleStatusUpdate(id, "cancelled");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Sukoon World</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-500">
                Overview of bookings and performance
              </p>
            </div>
            <Button onClick={fetchData} variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>

          <div className="mb-6 flex gap-4 border-b border-gray-200 pb-2">
            <button
              className={`pb-2 px-1 font-medium ${activeTab === "analytics" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
            <button
              className={`pb-2 px-1 font-medium ${activeTab === "bookings" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("bookings")}
            >
              All Bookings
            </button>
            <button
              className={`pb-2 px-1 font-medium ${activeTab === "users" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("users")}
            >
              All Users
            </button>
          </div>

          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Revenue"
                  value={stats.totalRevenue}
                  icon={DollarSign}
                  color="bg-green-500"
                  prefix="₹"
                />
                <StatCard
                  title="Total Bookings"
                  value={stats.totalBookings}
                  icon={Users}
                  color="bg-blue-500"
                />
                <StatCard
                  title="Pending Sessions"
                  value={stats.pending}
                  icon={Clock}
                  color="bg-yellow-500"
                />
                <StatCard
                  title="Confirmed Sessions"
                  value={stats.confirmed}
                  icon={CheckCircle}
                  color="bg-indigo-500"
                />
              </div>

              {/* Chart Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold mb-6">
                  Booking Analytics (Recent Activity)
                </h2>
                {stats.chartData.length > 0 ? (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Bar
                          dataKey="bookings"
                          fill="#4F46E5"
                          radius={[4, 4, 0, 0]}
                          barSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-400">
                    No analytics data yet
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "bookings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Recent Bookings Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Manage Bookings</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Client
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Service & Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                                {booking.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {booking.email}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {booking.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {booking.sessionType}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {booking.date} at {booking.time}
                            </div>
                            {booking.notes && (
                              <div
                                className="text-xs text-gray-400 mt-1 truncate w-40"
                                title={booking.notes}
                              >
                                Note: {booking.notes}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-gray-900">
                              ₹{booking.amount / 100}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                              ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : booking.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {booking.status === "pending"
                                ? "Payment Pending"
                                : booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            {booking.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() =>
                                    handleStatusUpdate(booking.id, "confirmed")
                                  }
                                  title="Confirm Booking"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() =>
                                    handleCancelBooking(booking.id)
                                  }
                                  title="Cancel Booking"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {booking.status === "confirmed" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  onClick={() =>
                                    handleStatusUpdate(booking.id, "completed")
                                  }
                                >
                                  Mark Completed
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() =>
                                    handleCancelBooking(booking.id)
                                  }
                                  title="Cancel Booking"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                      {bookings.length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-6 py-12 text-center text-gray-500"
                          >
                            No bookings found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Registered Users</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                          Registered
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {usersList.map((usr) => (
                        <tr
                          key={usr.id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                                {usr.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {usr.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {usr.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                              ${usr.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              {usr.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(usr.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                      {usersList.length === 0 && (
                        <tr>
                          <td
                            colSpan="3"
                            className="px-6 py-12 text-center text-gray-500"
                          >
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
