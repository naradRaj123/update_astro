import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-yellow-50 common-margin-top">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-yellow-400">
          <CardHeader className="text-center p-8 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
            >
              <ShieldCheck className="h-16 w-16 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800">
              Privacy Policy
            </CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-2">
              Effective Date: October 2025 | Last Updated: October 2025
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-10 space-y-8 bg-white text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                1. Introduction
              </h2>
              <p>
                Welcome to <strong>Astrotruth India Pvt. Ltd.</strong> (“Astrotruth,” “we,”
                “our,” or “us”). We are committed to protecting your personal
                information and respecting your privacy. This Privacy Policy
                explains how we collect, use, store, and share information when
                you visit{" "}
                <a
                  href="https://astrotruth.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  https://astrotruth.in
                </a>{" "}
                or use our related online services — including astrology
                consultations, gemstone and Rudraksh purchases, and other
                offerings provided by Astrotruth. By accessing or using our
                website, you agree to this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                2. Information We Collect
              </h2>
              <h3 className="font-bold mt-2">a. Personal Information</h3>
              <p>
                When you interact with our website, make a purchase, or request
                an astrology consultation, we may collect:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Date, Time, and Place of Birth</li>
                <li>Gender</li>
                <li>Billing or Payment Details (processed securely)</li>
                <li>
                  Address or Delivery Details (for gemstone or Rudraksh
                  shipments)
                </li>
              </ul>

              <h3 className="font-bold mt-4">
                b. Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>IP Address and Device Information</li>
                <li>Browser Type, Operating System, and Access Times</li>
                <li>Pages Viewed, Duration on Page, and Click Actions</li>
                <li>Referring Website URLs</li>
              </ul>

              <h3 className="font-bold mt-4">c. Cookies and Tracking</h3>
              <p>
                We use cookies, pixels, and analytics tools to improve your
                experience, remember preferences, and analyze site traffic. You
                can manage or disable cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Provide personalized astrology reports and consultations
                </li>
                <li>Process product orders and deliver gemstones or Rudraksh</li>
                <li>Send booking confirmations and payment receipts</li>
                <li>Improve website functionality and user experience</li>
                <li>Communicate promotional offers (with your consent)</li>
                <li>Detect and prevent fraudulent or illegal activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                4. How We Share Your Information
              </h2>
              <p>
                We do not sell or rent your personal data. We may share it only
                with:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Service Providers:</strong> For hosting, payments,
                  logistics, or analytics.
                </li>
                <li>
                  <strong>Legal Compliance:</strong> When required by law or
                  authority.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In case of merger or
                  restructuring.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                5. Payment and Transaction Security
              </h2>
              <p>
                Payments are processed through secure, PCI-DSS–compliant
                gateways. We do not store your full card information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                6. Data Retention
              </h2>
              <p>
                We retain data only as long as necessary to fulfill your
                services, comply with legal requirements, and resolve disputes.
                Once no longer needed, data is deleted or anonymized.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                7. Data Protection and Security
              </h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>SSL encryption for all data transmission</li>
                <li>Restricted database access</li>
                <li>Regular system monitoring and security checks</li>
              </ul>
              <p className="mt-2">
                However, no online system can guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                8. Your Rights
              </h2>
              <p>You may:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access and correct your personal data</li>
                <li>Request deletion or restriction of your information</li>
                <li>
                  Withdraw consent for promotional emails at any time
                </li>
                <li>
                  Request a copy of your stored data by emailing{" "}
                  <a
                    href="mailto:support@astrotruth.com"
                    className="text-blue-600 underline"
                  >
                    support@astrotruth.com
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                9. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party sites (e.g.,
                payment gateways, analytics). We are not responsible for their
                policies. Please review their privacy terms separately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                10. Children’s Privacy
              </h2>
              <p>
                Our services are not intended for children under 13. We do not
                knowingly collect or store data from minors. If identified, such
                data will be deleted promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                11. International Data Transfers
              </h2>
              <p>
                Your data may be processed in or transferred to servers located
                in India or other countries where Astrotruth operates. By using
                our website, you consent to these transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                12. Updates to This Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically. Any changes will
                be posted here with an updated effective date. Continued use of
                the website indicates acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                13. Contact Us
              </h2>
              <p>
                For questions, feedback, or data-related requests, please
                contact:
              </p>
              <div className="pl-4 mt-2">
                <p>
                  <strong>Astrotruth India Pvt. Ltd.</strong>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:support@astrotruth.com"
                    className="text-blue-600 underline"
                  >
                    support@astrotruth.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a
                    href="https://astrotruth.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    https://astrotruth.in
                  </a>
                </p>
                <p>Registered Office: India</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
