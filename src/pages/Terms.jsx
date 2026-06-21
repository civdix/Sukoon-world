import React from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";

const Terms = () => {
  const VITE_ADMIN_EMAIL =
    import.meta.env.VITE_ADMIN_EMAIL || "info@sukoonworld.org";
  const VITE_SUPPORT_PHONE_NUMBER =
    import.meta.env.VITE_SUPPORT_PHONE_NUMBER || "+91 8447579022";
  return (
    <>
      <Helmet>
        <title>
          Terms of Service - Sukoon World | Service Terms & Conditions
        </title>
        <meta
          name="description"
          content="Read our terms of service to understand the conditions for using Sukoon World's mental wellness and counselling services. Important information about our service agreement."
        />
        <meta
          property="og:title"
          content="Terms of Service - Sukoon World | Service Terms & Conditions"
        />
        <meta
          property="og:description"
          content="Read our terms of service to understand the conditions for using Sukoon World's mental wellness and counselling services. Important information about our service agreement."
        />
      </Helmet>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Please read these terms carefully before using our mental wellness
              services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
          >
            <div>
              <p className="text-gray-600 mb-6">
                <strong>Last updated:</strong> July 1, 2026
              </p>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Sukoon World. These Terms of Service ("Terms") govern
                your use of our mental wellness and counselling services. By
                accessing or using our services, you agree to be bound by these
                Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700">
                By using Sukoon World services, you acknowledge that you have
                read, understood, and agree to be bound by these Terms and our
                Privacy Policy. If you do not agree to these Terms, please do
                not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                2. Description of Services
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>
                  Sukoon World provides online mental wellness services
                  including:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Individual counselling sessions</li>
                  <li>Stress management coaching</li>
                  <li>Mindfulness training</li>
                  <li>Discovery calls and consultations</li>
                  <li>Educational resources and content</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                3. Eligibility and Age Requirements
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>To use our services, you must:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Be at least 14 years of age</li>
                  <li>Have the legal capacity to enter into this agreement</li>
                  <li>Provide accurate and complete information</li>
                  <li>
                    Not be prohibited from using our services under applicable
                    law
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                4. Professional Relationship and Limitations
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>Not Emergency Services:</strong> Sukoon World is not
                  an emergency or crisis intervention service. If you are
                  experiencing a mental health emergency, please contact your
                  local emergency services or crisis helpline immediately.
                </p>
                <p>
                  <strong>Professional Boundaries:</strong> Our counsellors
                  maintain professional boundaries and follow ethical
                  guidelines. The therapeutic relationship is professional and
                  confidential.
                </p>
                <p>
                  <strong>Scope of Practice:</strong> Our services are designed
                  for general mental wellness support and do not replace medical
                  treatment or psychiatric care when needed.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                5. Booking and Scheduling
              </h2>
              <div className="text-gray-700 space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Sessions must be booked in advance through our online system
                  </li>
                  <li>
                    You are responsible for attending sessions at the scheduled
                    time
                  </li>
                  <li>Late arrivals may result in shortened sessions</li>
                  <li>Repeated no-shows may result in service termination</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                6. Payment Terms
              </h2>
              <div className="text-gray-700 space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Payment is due at the time of booking unless otherwise
                    arranged
                  </li>
                  <li>Discovery calls are complimentary</li>
                  <li>Refunds are subject to our cancellation policy</li>
                  <li>Prices may change with 30 days notice</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                7. Confidentiality and Privacy
              </h2>
              <p className="text-gray-700">
                We maintain strict confidentiality in accordance with
                professional standards and applicable laws. Information may only
                be disclosed with your consent or as required by law. Please
                refer to our Privacy Policy for detailed information about data
                handling.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                8. User Responsibilities
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>You agree to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide accurate and honest information</li>
                  <li>Participate actively and respectfully in sessions</li>
                  <li>
                    Maintain confidentiality of other participants (if
                    applicable)
                  </li>
                  <li>Use services only for their intended purpose</li>
                  <li>
                    Notify us of any changes in your circumstances that may
                    affect treatment
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                9. Technology Requirements
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>For online sessions, you are responsible for:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Reliable internet connection</li>
                  <li>Compatible device with camera and microphone</li>
                  <li>Private, secure location for sessions</li>
                  <li>Technical troubleshooting on your end</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                10. Limitation of Liability
              </h2>
              <p className="text-gray-700">
                Sukoon World and its counsellors shall not be liable for any
                indirect, incidental, special, or consequential damages arising
                from the use of our services. Our liability is limited to the
                amount paid for services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                11. Termination
              </h2>
              <p className="text-gray-700">
                Either party may terminate the therapeutic relationship at any
                time. We reserve the right to terminate services for violation
                of these Terms, non-payment, or if we determine that our
                services are not appropriate for your needs.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-gray-700">
                We may modify these Terms at any time. Changes will be posted on
                our website with an updated effective date. Continued use of our
                services after changes constitutes acceptance of the new Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                13. Contact Information
              </h2>
              <div className="text-gray-700">
                <p className="mb-2">
                  For questions about these Terms, please contact us:
                </p>
                <ul className="space-y-1">
                  <li>
                    <strong>Email:</strong> {VITE_ADMIN_EMAIL}
                  </li>
                  <li>
                    <strong>Phone:</strong> {VITE_SUPPORT_PHONE_NUMBER}
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Terms;
