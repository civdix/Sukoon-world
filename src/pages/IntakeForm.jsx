import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

const IntakeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    mainConcern: "",
    preferredMode: "",
    consent: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConsentChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      consent: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Store form data in localStorage
    const intakeData = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    const existingIntakes = JSON.parse(
      localStorage.getItem("sukoonIntakes") || "[]",
    );
    existingIntakes.push(intakeData);
    localStorage.setItem("sukoonIntakes", JSON.stringify(existingIntakes));

    toast({
      title: "🚧 Form submission coming soon!",
      description:
        "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>
          Pre-Session Intake Form - Sukoon World | Prepare for Your Session
        </title>
        <meta
          name="description"
          content="Complete your pre-session intake form to help us understand your needs and provide the best possible care during your mental wellness session."
        />
        <meta
          property="og:title"
          content="Pre-Session Intake Form - Sukoon World | Prepare for Your Session"
        />
        <meta
          property="og:description"
          content="Complete your pre-session intake form to help us understand your needs and provide the best possible care during your mental wellness session."
        />
      </Helmet>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">
              Pre-Session Intake Form
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Help us understand your needs better by completing this
              confidential intake form before your session.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-poppins font-semibold text-secondary mb-4">
                  Personal Information
                </h2>

                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    required
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="mt-1 max-w-32"
                    placeholder="25"
                  />
                </div>
              </div>

              {/* Session Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-poppins font-semibold text-secondary mb-4">
                  Session Information
                </h2>

                <div>
                  <Label htmlFor="mainConcern">Main Concern or Goal *</Label>
                  <Textarea
                    id="mainConcern"
                    name="mainConcern"
                    required
                    value={formData.mainConcern}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={4}
                    placeholder="Please describe what you'd like to work on or any specific concerns you have..."
                  />
                </div>

                <div>
                  <Label htmlFor="preferredMode">
                    Preferred Session Mode *
                  </Label>
                  <select
                    id="preferredMode"
                    name="preferredMode"
                    required
                    value={formData.preferredMode}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select preferred mode</option>
                    <option value="video">Video Call</option>
                    <option value="audio">Audio Call Only</option>
                    <option value="chat">Text Chat</option>
                  </select>
                </div>
              </div>

              {/* Consent */}
              <div className="space-y-4">
                <h2 className="text-xl font-poppins font-semibold text-secondary mb-4">
                  Consent & Agreement
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    By checking the box below, I acknowledge and agree to the
                    following:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2 mb-4">
                    <li>
                      • I understand that this is a counselling service and not
                      emergency care
                    </li>
                    <li>
                      • I consent to participate in online counselling sessions
                    </li>
                    <li>
                      • I understand the limitations and risks of online therapy
                    </li>
                    <li>
                      • I agree to the privacy policy and terms of service
                    </li>
                    <li>• I confirm that I am 18 years of age or older</li>
                  </ul>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={handleConsentChange}
                    />
                    <Label htmlFor="consent" className="text-sm">
                      I agree to the terms and conditions stated above *
                    </Label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 rounded-full text-lg py-3"
                  disabled={!formData.consent}
                >
                  Submit Intake Form
                </Button>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Your information is completely confidential and will only be
                  shared with your assigned counsellor.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default IntakeForm;
