import React from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";

const CancellationPolicy = () => {
  const VITE_SUPPORT_EMAIL =
    import.meta.env.VITE_SUPPORT_EMAIL || "support@sukoonworld.org";
  const VITE_SUPPORT_PHONE_NUMBER =
    import.meta.env.VITE_SUPPORT_PHONE_NUMBER || "+91 8447579022";
  return (
    <>
      <Helmet>
        <title>
          Cancellation Policy - Sukoon World | Session Cancellation & Refund
          Terms
        </title>
        <meta
          name="description"
          content="Understand our cancellation policy for mental wellness sessions. Learn about our 24-hour cancellation requirement, refund terms, and rescheduling options."
        />
        <meta
          property="og:title"
          content="Cancellation Policy - Sukoon World | Session Cancellation & Refund Terms"
        />
        <meta
          property="og:description"
          content="Understand our cancellation policy for mental wellness sessions. Learn about our 24-hour cancellation requirement, refund terms, and rescheduling options."
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
              Cancellation Policy
            </h1>
            <p className="text-xl text-gray-600">
              Our flexible cancellation policy designed to respect both your
              time and our counsellors' schedules.
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
                At Sukoon World, we understand that life can be unpredictable.
                Our cancellation policy is designed to be fair and flexible
                while ensuring our counsellors can maintain their schedules
                effectively.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                24-Hour Cancellation Policy
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>Standard Cancellation:</strong> You may cancel or
                  reschedule your appointment up to 24 hours before your
                  scheduled session time without any penalty.
                </p>
                <p>
                  <strong>How to Cancel:</strong> Cancellations can be made
                  through:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your online booking portal</li>
                  <li>Email to {VITE_SUPPORT_EMAIL}</li>
                  <li>Phone call to {VITE_SUPPORT_PHONE_NUMBER}</li>
                  <li>WhatsApp message (during business hours)</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Late Cancellation and No-Show Policy
              </h2>
              <div className="text-gray-700 space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    Late Cancellation (Less than 24 hours)
                  </h3>
                  <p className="text-yellow-700">
                    Cancellations made less than 24 hours before your scheduled
                    session will be charged 50% of the session fee.
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">
                    No-Show Policy
                  </h3>
                  <p className="text-red-700">
                    If you miss your appointment without prior notice, you will
                    be charged the full session fee.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Emergency Exceptions
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>
                  We understand that true emergencies can occur. Exceptions to
                  our cancellation policy may be made for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Medical emergencies (documentation may be required)</li>
                  <li>Family emergencies</li>
                  <li>Severe weather conditions</li>
                  <li>Technical issues on our end</li>
                </ul>
                <p className="mt-4">
                  <strong>Note:</strong> Emergency exceptions are reviewed on a
                  case-by-case basis. Please contact us as soon as possible to
                  discuss your situation.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Rescheduling Options
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>Free Rescheduling:</strong> Sessions cancelled with
                  24+ hours notice can be rescheduled at no additional cost,
                  subject to counsellor availability.
                </p>
                <p>
                  <strong>Priority Rebooking:</strong> We will make every effort
                  to accommodate your preferred time slots when rescheduling.
                </p>
                <p>
                  <strong>Multiple Reschedules:</strong> While we understand
                  that schedules can change, excessive rescheduling may affect
                  future booking priority.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Refund Policy
              </h2>
              <div className="text-gray-700 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">
                      Full Refund
                    </h3>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Cancellation 24+ hours in advance</li>
                      <li>• Technical issues on our end</li>
                      <li>• Counsellor unavailability</li>
                      <li>• Approved emergency situations</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-800 mb-2">
                      Partial Refund (50%)
                    </h3>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• Late cancellation (less than 24 hours)</li>
                      <li>
                        • First-time late cancellation may receive full refund
                        at discretion
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Counsellor-Initiated Cancellations
              </h2>
              <div className="text-gray-700 space-y-2">
                <p>If your counsellor needs to cancel your session:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    You will receive at least 24 hours notice when possible
                  </li>
                  <li>Full refund will be provided immediately</li>
                  <li>Priority rescheduling will be offered</li>
                  <li>Alternative counsellor may be suggested if preferred</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Package and Subscription Cancellations
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>Session Packages:</strong> Individual sessions within
                  packages follow the same cancellation policy. Unused sessions
                  in packages can be refunded pro-rata within 30 days of
                  purchase.
                </p>
                <p>
                  <strong>Ongoing Services:</strong> Subscription-based services
                  can be cancelled with 7 days notice. Refunds for unused
                  portions will be calculated on a pro-rata basis.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Processing Times
              </h2>
              <div className="text-gray-700 space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Refund Processing:</strong> 3-5 business days for
                    credit card refunds
                  </li>
                  <li>
                    <strong>Rescheduling Confirmation:</strong> Within 24 hours
                    of request
                  </li>
                  <li>
                    <strong>Emergency Review:</strong> Same day when possible,
                    within 48 hours maximum
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold text-secondary mb-4">
                Contact Us About Cancellations
              </h2>
              <div className="text-gray-700">
                <p className="mb-4">
                  For cancellations, rescheduling, or questions about this
                  policy:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    <li>
                      <strong>Email:</strong> {VITE_SUPPORT_EMAIL}
                    </li>
                    <li>
                      <strong>Phone:</strong> {VITE_SUPPORT_PHONE_NUMBER}
                    </li>
                    <li>
                      <strong>WhatsApp:</strong> Available during business hours
                    </li>
                  </ul>
                </div>
                <p className="mt-4 text-sm">
                  <strong>Business Hours:</strong> Monday-Friday 9 AM - 6 PM
                  EST, Saturday 10 AM - 4 PM EST
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-poppins font-semibold text-blue-800 mb-3">
                Our Commitment to You
              </h3>
              <p className="text-blue-700">
                We strive to be understanding and flexible while maintaining
                fair policies for all clients. If you have special circumstances
                or concerns about our cancellation policy, please don't hesitate
                to discuss them with us. Your mental wellness journey is
                important to us, and we want to support you in the best way
                possible.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CancellationPolicy;
