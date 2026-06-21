import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load page components
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const BookAppointment = lazy(() => import("@/pages/BookAppointment"));
const MyBookings = lazy(() => import("@/pages/MyBookings"));
const IntakeForm = lazy(() => import("@/pages/IntakeForm"));
const Blog = lazy(() => import("@/pages/Blog"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Terms = lazy(() => import("@/pages/Terms"));
const CancellationPolicy = lazy(() => import("@/pages/CancellationPolicy"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Counsellors = lazy(() => import("@/pages/Counsellors"));
const CounsellorProfile = lazy(() => import("@/pages/CounsellorProfile"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));

// Modern fallback loading spinner
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/counsellors" element={<Counsellors />} />
              <Route
                path="/counsellors/:counsellorId"
                element={<CounsellorProfile />}
              />
              <Route path="/services" element={<Services />} />
              <Route path="/book" element={<BookAppointment />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/intake-form" element={<IntakeForm />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cancellation" element={<CancellationPolicy />} />
              <Route path="/admin" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
