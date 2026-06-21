import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";
import { createICSFile } from "@/lib/calendar";
import { createBooking, getCounsellors } from "@/lib/storage";

const BOOKING_DRAFT_KEY = "sukoonBookingDraft";
const TEMPLATE_BOOKER_ID = "template_odsk9gn";
const TEMPLATE_HOST_ID = "template_60qd3ws";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const toMeetSegment = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-₹)/g, "");

const BookAppointment = () => {
  const VITE_NODE_END_POINT =
    import.meta.env.VITE_NODE_END_POINT || "http://localhost:5000/api";
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isAfterTenPm = () => new Date().getHours() >= 22;

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [allCounsellors, setAllCounsellors] = useState([]);
  const [hasFreeSession, setHasFreeSession] = useState(false);
  const [draftHydrated, setDraftHydrated] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    selectedService: "",
    selectedCounsellor: "",
    selectedDate: undefined,
    selectedTime: "",
    issue: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    upiId: "",
    bankName: "",
  });

  const services = [
    { id: "discovery", name: "Discovery Call (30 min)", price: "Free" },
    { id: "counselling", name: "Counselling Session (60 min)", price: "₹399" },
    { id: "stress", name: "Stress Management (45 min)", price: "₹299" },
    { id: "mindfulness", name: "Mindfulness Coaching (45 min)", price: "₹249" },
    { id: "relationship", name: "Relationship Counselling (60 min)", price: "₹499" },
    { id: "anxiety", name: "Anxiety Management (45 min)", price: "₹299" },
  ];

  // timeSlots removed — time selection is no longer requested from users

  const saveBookingDraft = (draft) => {
    localStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(draft));
  };

  const clearBookingDraft = () => {
    localStorage.removeItem(BOOKING_DRAFT_KEY);
  };

  const loadBookingDraft = (urlServiceId, urlCounsellorId) => {
    const savedDraft = localStorage.getItem(BOOKING_DRAFT_KEY);
    if (!savedDraft) {
      if (urlServiceId || urlCounsellorId) {
        setFormData((prev) => ({
          ...prev,
          ...(urlServiceId ? { selectedService: urlServiceId } : {}),
          ...(urlCounsellorId ? { selectedCounsellor: urlCounsellorId } : {}),
        }));
      }
      return;
    }

    try {
      const parsedDraft = JSON.parse(savedDraft);
      if (parsedDraft?.formData) {
        const restoredDate = parsedDraft.formData.selectedDate
          ? new Date(parsedDraft.formData.selectedDate)
          : undefined;
        const token = localStorage.getItem("token");
        const selectedService = urlServiceId || (
          !token && parsedDraft.formData.selectedService === "discovery"
            ? ""
            : parsedDraft.formData.selectedService || ""
        );
        const selectedCounsellor = urlCounsellorId || parsedDraft.formData.selectedCounsellor || "";

        setFormData({
          ...parsedDraft.formData,
          selectedService,
          selectedCounsellor,
          selectedDate: restoredDate,
        });
      }

      if (urlServiceId || urlCounsellorId) {
        setStep(1);
      } else if (parsedDraft?.step) {
        setStep(parsedDraft.step);
      }
      
      if (parsedDraft?.paymentMethod)
        setPaymentMethod(parsedDraft.paymentMethod);
    } catch (error) {
      console.error("Failed to restore booking draft", error);
      clearBookingDraft();
      if (urlServiceId || urlCounsellorId) {
        setFormData((prev) => ({
          ...prev,
          ...(urlServiceId ? { selectedService: urlServiceId } : {}),
          ...(urlCounsellorId ? { selectedCounsellor: urlCounsellorId } : {}),
        }));
      }
    }
  };

  useEffect(() => {
    const checkFreeSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${VITE_NODE_END_POINT}/bookings/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usedFree = res.data.some(
          (b) => b.amount === 0 && b.status !== "cancelled",
        );
        setHasFreeSession(usedFree);
      } catch (e) {
        console.error("Could not verify free sessions", e);
      }
    };

    const counsellors = getCounsellors();
    setAllCounsellors(counsellors);

    const queryParams = new URLSearchParams(location.search);
    const counsellorId = queryParams.get("counsellor");
    const validCounsellor = counsellorId && counsellors.some((c) => c.id === counsellorId) ? counsellorId : null;

    const serviceId = queryParams.get("service");
    const validService = serviceId && services.some((s) => s.id === serviceId) ? serviceId : null;

    checkFreeSession();
    loadBookingDraft(validService, validCounsellor);
    setDraftHydrated(true);
  }, [location.search]);

  useEffect(() => {
    if (!draftHydrated) return;

    const selectedDateValue = formData.selectedDate
      ? formData.selectedDate.toISOString()
      : null;

    saveBookingDraft({
      formData: { ...formData, selectedDate: selectedDateValue },
      step,
      paymentMethod,
      updatedAt: new Date().toISOString(),
    });
  }, [formData, step, paymentMethod, draftHydrated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phone ||
        !formData.selectedService ||
        !formData.selectedCounsellor
      ) {
        toast({
          title: "Incomplete Details",
          description: "Please fill in all personal and service details.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.selectedDate || !formData.issue) {
        toast({
          title: "Date & Issue Required",
          description: "Please select a date and describe your issue.",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    }
  };

  const prevStep = () => setStep((current) => Math.max(1, current - 1));

  const handleSuccessCompletion = async (
    serviceDetails,
    counsellorDetails,
    formattedDate,
    meetLink,
    paidVia,
    fullDateTime,
  ) => {
    const bookingData = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      service_type: serviceDetails.name,
      service_id: formData.selectedService,
      counsellor_name: counsellorDetails.name,
      counsellor_id: formData.selectedCounsellor,
      appointment_date: formattedDate,
      appointment_time: formData.selectedTime || "",
      issue_description: formData.issue,
      price: serviceDetails.price,
      payment_method: paymentMethod,
      transaction_id: `txn_${Math.random().toString(36).slice(2, 11)}`,
    };

    try {
      createBooking(bookingData);

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const hostEmail =
        counsellorDetails?.email ||
        counsellorDetails?.contactEmail ||
        import.meta.env.VITE_HOST_EMAIL ||
        "";

      if (serviceId && publicKey) {
        const sendPromises = [
          emailjs.send(
            serviceId,
            TEMPLATE_BOOKER_ID,
            {
              booker_person: formData.fullName,
              booker_name: formData.fullName,
              booked_date: formattedDate,
              time: fullDateTime,
              host_name: counsellorDetails.name,
              meet_link: meetLink,
              booker_email: formData.email,
            },
            { publicKey },
          ),
        ];

        if (hostEmail) {
          sendPromises.push(
            emailjs.send(
              serviceId,
              TEMPLATE_HOST_ID,
              {
                booker_person: formData.fullName,
                booker_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                booked_date: formattedDate,
                booked_time: formData.selectedTime,
                time: fullDateTime,
                meet_link: meetLink,
                notes: formData.issue,
                host_email: hostEmail,
              },
              { publicKey },
            ),
          );
        }

        try {
          await Promise.all(sendPromises);
        } catch (emailError) {
          console.error("EmailJS send failed:", emailError);
          toast({
            title: "Booking Confirmed, Email Pending",
            description:
              "Your session is booked, but we could not send all confirmation emails right now.",
            variant: "destructive",
          });
        }
      }

      setConfirmationData({
        name: formData.fullName,
        email: formData.email,
        service: serviceDetails.name,
        counsellor: counsellorDetails.name,
        date: formattedDate,
        time: formData.selectedTime,
        meetLink,
        paymentMethod:
          paymentMethod === "razorpay"
            ? "Razorpay Secure"
            : paymentMethod.toUpperCase(),
      });

      setBookingComplete(true);
      setStep(4);
      clearBookingDraft();

      toast({
        title: "Booking Successful!",
        description: "A confirmation email has been sent to you.",
      });

      try {
        const icsBlob = createICSFile({
          serviceName: serviceDetails.name,
          counsellorName: counsellorDetails.name,
          date: formattedDate,
          time: formData.selectedTime,
        });
        const url = URL.createObjectURL(icsBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sukoon-world-appointment.ics";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error("Calendar gen failed", e);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentAndBooking = async () => {
    setIsSubmitting(true);

    const serviceDetails = services.find(
      (s) => s.id === formData.selectedService,
    );
    const counsellorDetails = allCounsellors.find(
      (c) => c.id === formData.selectedCounsellor,
    );

    if (!serviceDetails || !counsellorDetails || !formData.selectedDate) {
      toast({
        title: "Missing Details",
        description: "Please complete the form before proceeding.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const formattedDate = format(formData.selectedDate, "yyyy-MM-dd");
    const fullDateTime = `${format(formData.selectedDate, "EEEE, dd MMM yyyy")}${formData.selectedTime ? " at " + formData.selectedTime : ""}`;
    const meetLink = `https://meet.jit.si/sukoon-session-${toMeetSegment(formData.fullName)}-${formattedDate}`;

    const amountStr =
      serviceDetails.price === "Free"
        ? "0"
        : serviceDetails.price.replace(/[^0-9]/g, "");
    const amountInPaise = parseInt(amountStr, 10) * 100;

    const token = localStorage.getItem("token");
    if (!token) {
      saveBookingDraft({
        formData: {
          ...formData,
          selectedDate: formData.selectedDate
            ? formData.selectedDate.toISOString()
            : null,
        },
        step,
        paymentMethod,
        updatedAt: new Date().toISOString(),
      });
      toast({
        title: "Login Required",
        description: "Please sign in to complete your booking.",
        variant: "destructive",
      });
      navigate("/my-bookings?returnTo=/book&utl_source=book");
      setIsSubmitting(false);
      return;
    }

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const res = await axios.post(
        `${VITE_NODE_END_POINT}/bookings`,
        {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          sessionType: serviceDetails.name,
          date: formattedDate,
          time: formData.selectedTime || "",
          amount: amountInPaise,
          notes: formData.issue,
        },
        { headers },
      );

      const { orderId, amount, bookingId } = res.data;

      if (paymentMethod === "razorpay" && amount > 0) {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          toast({
            title: "Error",
            description: "Razorpay SDK failed to load. Are you online?",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || "dummy_key",
          amount,
          currency: "INR",
          name: "Sukoon World",
          description: `Booking for ${serviceDetails.name}`,
          order_id: orderId,
          handler: async function (response) {
            try {
              await axios.post(`${VITE_NODE_END_POINT}/bookings/verify`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId,
              });

              await handleSuccessCompletion(
                serviceDetails,
                counsellorDetails,
                formattedDate,
                meetLink,
                "Razorpay Secure",
                fullDateTime,
              );
            } catch (err) {
              toast({
                title: "Payment Verification Failed",
                description:
                  err.response?.data?.message || "Error verifying payment",
                variant: "destructive",
              });
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: "#4f46e5" },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          toast({
            title: "Payment Failed",
            description:
              response.error?.description || "Payment was not completed.",
            variant: "destructive",
          });
          setIsSubmitting(false);
        });
        rzp.open();
        return;
      }

      if (amountInPaise > 0) {
        toast({
          title: "Payment Required",
          description:
            "Please complete Razorpay payment to confirm this booking.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      await handleSuccessCompletion(
        serviceDetails,
        counsellorDetails,
        formattedDate,
        meetLink,
        paymentMethod.toUpperCase(),
        fullDateTime,
      );
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const renderProgressBar = () => (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10" />
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex flex-col items-center bg-white px-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= s ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
          >
            {s}
          </div>
          <span className="text-xs mt-1 font-medium text-gray-500">
            {s === 1 ? "Details" : s === 2 ? "Schedule" : "Payment"}
          </span>
        </div>
      ))}
    </div>
  );

  if (bookingComplete && confirmationData) {
    return (
      <section className="py-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-xl w-full mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-8">
              We&apos;ve sent a confirmation to{" "}
              <span className="font-semibold">{confirmationData.email}</span>
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Service</span>
                <span className="font-medium">{confirmationData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{confirmationData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time</span>
                <span className="font-medium">
                  {confirmationData.time || "Not specified"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Counsellor</span>
                <span className="font-medium">
                  {confirmationData.counsellor}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                <span className="text-gray-500">Payment</span>
                <span className="font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  {confirmationData.paymentMethod}
                </span>
              </div>
            </div>
            <Button
              onClick={() => navigate("/book")}
              className="w-full rounded-full"
            >
              Book Another Session
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mt-4 w-full"
            >
              Return Home
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book Appointment - Sukoon World</title>
      </Helmet>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <h1 className="text-3xl font-bold text-center mb-8 font-poppins text-secondary">
              Book Your Session
            </h1>
            {renderProgressBar()}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="md:col-span-2">
                      <Label>
                        Select Service <span style={{ color: "red" }}>*</span>
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        {services.map((service) => {
                          const isDisabled =
                            (service.price === "Free" && hasFreeSession);
                          const lockedForLogin = false;

                          return (
                            <div
                              key={service.id}
                              onClick={() => {
                                if (!isDisabled) {
                                  handleFieldSelect(
                                    "selectedService",
                                    service.id,
                                  );
                                }
                              }}
                              className={`p-4 border-2 rounded-xl transition-all ${
                                isDisabled
                                  ? "opacity-50 cursor-not-allowed border-gray-100 bg-gray-50"
                                  : formData.selectedService === service.id
                                    ? "border-primary bg-primary/5 cursor-pointer"
                                    : "border-gray-100 hover:border-primary/30 cursor-pointer"
                              }`}
                            >
                              <div className="font-medium">{service.name}</div>
                              <div
                                className={`text-sm font-semibold ${isDisabled ? "text-gray-500" : "text-primary"}`}
                              >
                                {lockedForLogin
                                  ? "Login to get this feature"
                                  : isDisabled
                                    ? "Used"
                                    : service.price}
                              </div>
                              {lockedForLogin && (
                                <div className="mt-1 text-xs text-gray-500">
                                  Sign in to unlock your free discovery call.
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <Label>
                        Select Counsellor{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <div className="grid grid-cols-1 gap-3 mt-2">
                        {allCounsellors.map((counsellor) => (
                          <div
                            key={counsellor.id}
                            onClick={() =>
                              handleFieldSelect(
                                "selectedCounsellor",
                                counsellor.id,
                              )
                            }
                            className={`p-3 border-2 rounded-xl cursor-pointer flex items-center gap-3 transition-all ${formData.selectedCounsellor === counsellor.id ? "border-primary bg-primary/5" : "border-gray-100 hover:border-primary/30"}`}
                          >
                            <img
                              src={counsellor.image}
                              alt={counsellor.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-medium text-sm">
                                {counsellor.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {counsellor.specialties.slice(0, 2).join(", ")}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <Label>
                          Full Name <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>
                            Email <span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <Label>
                            Phone <span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 234 567 890"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={nextStep} className="rounded-full px-8">
                      Next Step <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <div>
                      <Label className="mb-2 block">
                        Select Date <span style={{ color: "red" }}>*</span>
                      </Label>
                      <div className="border rounded-lg p-2 flex min-w-64 mx-auto justify-center">
                        <Calendar
                          mode="single"
                          selected={formData.selectedDate}
                          onSelect={(date) =>
                            handleFieldSelect("selectedDate", date)
                          }
                          className="rounded-md w-full"
                          disabled={(date) => {
                            const normalized = new Date(date);
                            normalized.setHours(0, 0, 0, 0);
                            if (normalized < today) return true;
                            if (
                              normalized.getTime() === today.getTime() &&
                              isAfterTenPm()
                            ) {
                              return true;
                            }
                            return false;
                          }}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 mt-6">
                      <Label>
                        What would you like to discuss?{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Textarea
                        name="issue"
                        value={formData.issue}
                        onChange={handleInputChange}
                        placeholder="Briefly describe your main concern..."
                        className="mt-2"
                      />
                    </div>

                    {/* Time selection removed — users are not asked to pick a time slot */}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="rounded-full px-8"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={nextStep} className="rounded-full px-8">
                      Proceed to Payment{" "}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-50 p-4 rounded-xl mb-6 flex justify-between items-center border border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">
                        Total Payable Amount
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          services.find(
                            (s) => s.id === formData.selectedService,
                          )?.price
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {
                          services.find(
                            (s) => s.id === formData.selectedService,
                          )?.name
                        }
                      </p>
                      <p className="text-xs text-gray-500">
                        {formData.selectedDate &&
                          format(formData.selectedDate, "MMM dd")}
                        {formData.selectedTime
                          ? ` at ${formData.selectedTime}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="w-full md:w-1/3 space-y-2">
                      <Label className="mb-2 block">Payment Method</Label>
                      {[
                        {
                          id: "razorpay",
                          label: "Razorpay Secure",
                          icon: ShieldCheck,
                        },
                      ].map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all border ${
                            paymentMethod === method.id
                              ? "bg-primary/10 border-primary text-primary font-medium shadow-sm"
                              : "bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200"
                          }`}
                        >
                          <method.icon
                            className={`w-5 h-5 ${paymentMethod === method.id ? "text-primary" : "text-gray-400"}`}
                          />
                          <span>{method.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="w-full md:w-2/3 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      {paymentMethod === "razorpay" && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 py-8">
                          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <ShieldCheck className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              Razorpay Secure Payment
                            </h3>
                            <p className="text-sm text-gray-500 max-w-xs mx-auto mt-1">
                              You will be redirected to the secure Razorpay
                              payment gateway to complete your transaction.
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <Lock className="w-3 h-3" /> 256-bit SSL Encrypted
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="rounded-full px-6"
                      disabled={isSubmitting}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Lock className="w-3 h-3 mr-1" /> Secure Transaction
                      </div>
                      <Button
                        onClick={handlePaymentAndBooking}
                        className="rounded-full px-8 min-w-[180px]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Proceed to Razorpay"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookAppointment;
