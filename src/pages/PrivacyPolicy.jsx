import React from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const VITE_ADMIN_EMAIL =
    import.meta.env.VITE_ADMIN_EMAIL || "info@sukoonworld.org";
  const VITE_SUPPORT_PHONE_NUMBER =
    import.meta.env.VITE_SUPPORT_PHONE_NUMBER || "+91 8447579022";
  const VITE_ADDRESS =
    import.meta.env.VITE_ADDRESS ||
    "Sector 1, Aimnabad, Bisrakh Jalalpur, Greater Noida, Bisrakh Jalalpur, Uttar Pradesh 201318";
  return (
    <>
      <Helmet>
        <title>
          Privacy Policy - Sukoon World | Your Privacy & Data Protection
        </title>
        <meta
          name="description"
          content="Read our comprehensive privacy policy to understand how Sukoon World protects your personal information and maintains confidentiality in our mental wellness services."
        />
        <meta
          property="og:title"
          content="Privacy Policy - Sukoon World | Your Privacy & Data Protection"
        />
        <meta
          property="og:description"
          content="Read our comprehensive privacy policy to understand how Sukoon World protects your personal information and maintains confidentiality in our mental wellness services."
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Your privacy is sacred to us. This policy explains how we protect
              and handle your personal information.
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
                At Sukoon World, we are committed to protecting your privacy and
                maintaining the confidentiality of your personal information.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our mental wellness
                services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">
                    Personal Information
                  </h3>
                  <p>
                    We collect information you provide directly to us,
                    including:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>Age and demographic information</li>
                    <li>Health information relevant to your mental wellness</li>
                    <li>Session notes and treatment records</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">
                    Technical Information
                  </h3>
                  <p>
                    We automatically collect certain information when you use
                    our services:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Device information and IP address</li>
                    <li>Browser type and version</li>
                    <li>Usage patterns and session data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                How We Use Your Information
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Provide mental wellness counselling and support services
                  </li>
                  <li>Schedule and manage your appointments</li>
                  <li>Maintain treatment records and track progress</li>
                  <li>Process payments and billing</li>
                  <li>
                    Communicate with you about your sessions and our services
                  </li>
                  <li>Improve our services and user experience</li>
                  <li>Comply with legal and regulatory requirements</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Information Sharing and Disclosure
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties except in the following
                  circumstances:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>With Your Consent:</strong> When you explicitly
                    authorize us to share your information
                  </li>
                  <li>
                    <strong>Service Providers:</strong> With trusted third-party
                    service providers who assist in our operations
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or
                    to protect safety and security
                  </li>
                  <li>
                    <strong>Emergency Situations:</strong> When necessary to
                    prevent serious harm to you or others
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Data Security
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>
                  We implement comprehensive security measures to protect your
                  information:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>End-to-end encryption for all communications</li>
                  <li>Secure data storage with regular backups</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Regular security audits and updates</li>
                  <li>HIPAA-compliant data handling procedures</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Your Rights and Choices
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of certain communications</li>
                  <li>Receive a copy of your treatment records</li>
                  <li>File a complaint with regulatory authorities</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Retention of Information
              </h2>
              <p className="text-gray-700">
                We retain your personal information for as long as necessary to
                provide our services and comply with legal obligations.
                Treatment records are maintained according to professional
                standards and applicable laws, typically for a minimum of 7
                years after the last session.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Children's Privacy
              </h2>
              <p className="text-gray-700">
                Our services are intended for individuals 18 years of age and
                older. We do not knowingly collect personal information from
                children under 18. If you believe we have collected information
                from a child under 18, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new policy on
                our website and updating the "Last updated" date. Your continued
                use of our services after such changes constitutes acceptance of
                the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Contact Us
              </h2>
              <div className="text-gray-700">
                <p className="mb-2">
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us:
                </p>
                <ul className="space-y-1">
                  <li>
                    <strong>Email:</strong> {VITE_ADMIN_EMAIL}
                  </li>
                  <li>
                    <strong>Phone:</strong> {VITE_SUPPORT_PHONE_NUMBER}
                  </li>
                  <li>
                    <strong>Address:</strong> {VITE_ADDRESS}
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

export default PrivacyPolicy;
