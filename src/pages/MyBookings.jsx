import React, { useState, useEffect, useContext } from "react";
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, Clock, LogOut, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { user, token, login, register, logout, loading, sendOtp, verifyOtp } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const VITE_NODE_END_POINT =
    import.meta.env.VITE_NODE_END_POINT || "http://localhost:5000/api";
  const [bookings, setBookings] = useState([]);
  const [isLoginView, setIsLoginView] = useState(true);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const utmSource = searchParams.get("utm_source") || searchParams.get("utl_source");
  const returnTo =
    utmSource === "book"
      ? (searchParams.get("returnTo") || "/book")
      : "/my-bookings";

  useEffect(() => {
    if (user && token) {
      fetchBookings();
    }
  }, [user, token]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${VITE_NODE_END_POINT}/bookings/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("fetchBookings error:", error);
      if (error.response?.status === 401) {
        logout();
        toast({
          title: "Session Expired",
          description: "Please log in again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to fetch bookings",
          variant: "destructive",
        });
      }
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthSubmitting(true);
    try {
      if (isLoginView) {
        await login(email, password);
        toast({ title: "Logged in successfully" });
        navigate(returnTo, { replace: true });
      } else {
        // Enforce password strength: 8+ characters, alphanumeric, special character
        if (password.length < 8) {
          toast({
            title: "Weak Password",
            description: "Password must be at least 8 characters long.",
            variant: "destructive",
          });
          setAuthSubmitting(false);
          return;
        }
        if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
          toast({
            title: "Weak Password",
            description: "Password must contain both letters and numbers.",
            variant: "destructive",
          });
          setAuthSubmitting(false);
          return;
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
          toast({
            title: "Weak Password",
            description: "Password must contain at least one special character.",
            variant: "destructive",
          });
          setAuthSubmitting(false);
          return;
        }

        await register(name, email, password);
        // After register, API sends OTP. Show OTP verification UI.
        setOtpEmail(email);
        setSavedPassword(password);
        setShowOtp(true);
        toast({ title: "Registered. Enter OTP sent to your email." });
      }
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: typeof error === "string" ? error : (error?.message || "An unexpected error occurred."),
        variant: "destructive",
      });
      // If login failed due to unverified email, prompt for OTP
      if (
        isLoginView &&
        typeof error === "string" &&
        error.toLowerCase().includes("email not verified")
      ) {
        setOtpEmail(email);
        setSavedPassword(password);
        setShowOtp(true);
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      await sendOtp(otpEmail);
      toast({ title: "OTP sent to " + otpEmail });
    } catch (err) {
      toast({
        title: "Failed to send OTP",
        description: typeof err === "string" ? err : (err?.message || "Failed to send OTP"),
        variant: "destructive",
      });
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpValue || !otpEmail) {
      toast({ title: "Enter OTP", variant: "destructive" });
      return;
    }
    try {
      await verifyOtp(otpEmail, otpValue);
      toast({ title: "Email verified successfully" });
      setShowOtp(false);
      // Auto-login if we have saved password
      if (savedPassword) {
        try {
          await login(otpEmail, savedPassword);
          toast({ title: "Logged in" });
          navigate(returnTo, { replace: true });
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      toast({
        title: "OTP verification failed",
        description: typeof err === "string" ? err : (err?.message || "OTP verification failed"),
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Helmet>
        <title>My Dashboard - Sukoon World</title>
      </Helmet>

      <section className="py-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!user && (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-2xl font-bold font-poppins text-center mb-6">
                {isLoginView
                  ? "Sign In to Track Bookings"
                  : "Create an Account"}
              </h1>
              {showOtp ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Enter the OTP sent to <strong>{otpEmail}</strong>
                  </p>
                  <Input
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleVerifyOtp} className="flex-1">
                      Verify OTP
                    </Button>
                    <Button variant="ghost" onClick={handleSendOtp}>
                      Resend
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {returnTo === "/book" && (
                    <div className="mb-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                      Sign in to keep your booking details safe and continue to
                      payment.
                    </div>
                  )}
                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    {!isLoginView && (
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    )}
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={authSubmitting}
                    >
                      {authSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {isLoginView ? "Signing In..." : "Signing Up..."}
                        </span>
                      ) : isLoginView ? (
                        "Sign In"
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </form>
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setIsLoginView(!isLoginView)}
                      disabled={authSubmitting}
                      className="text-primary text-sm hover:underline"
                    >
                      {isLoginView
                        ? "Do not have an account? Sign Up"
                        : "Already have an account? Sign In"}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {user && (
            <>
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h1 className="text-3xl font-bold font-poppins text-secondary">
                    Welcome, {user.name}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Here are your past and upcoming sessions
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="flex gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {Array.isArray(bookings) && bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center border border-gray-100"
                    >
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium uppercase
                            ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {booking.status === "pending"
                              ? "Payment Pending"
                              : booking.status}
                          </span>
                          <h3 className="font-semibold text-lg">
                            {booking.sessionType}
                          </h3>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" /> Booking for{" "}
                            {booking.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> {booking.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" /> {booking.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary mb-2">
                          ₹{booking.amount / 100}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-500 mb-4">
                      You don't have any bookings yet.
                    </p>
                    <Button onClick={() => (window.location.href = "/book")}>
                      Book a Session
                    </Button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MyBookings;
