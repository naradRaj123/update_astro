import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

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
            <CardTitle className="text-4xl font-bold text-gray-800">Privacy Policy</CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-2">
              Effective Date: October 2025
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-10 space-y-8 bg-white text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">1. Information We Collect</h2>
              <p>When you use our apps, we may collect the following types of information:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Device or Other IDs:</strong> Unique identifiers from your device for app functionality and analytics.</li>
                <li><strong>App Usage Data:</strong> Information about how you interact with our apps, such as pages visited, features used, and crash reports.</li>
                <li><strong>Analytics Data:</strong> Collected through third-party services (e.g., Firebase, Google Analytics) to improve app performance.</li>
                <li><strong>Optional User Data:</strong> Information you provide voluntarily, such as account details or feedback submissions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>To provide and improve our services and app functionality.</li>
                <li>To analyze app usage and performance to enhance user experience.</li>
                <li>To communicate with you regarding updates, support, or promotions if you opted in.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">3. How We Share Your Information</h2>
              <p>We do not sell your personal information. We may share data in the following situations:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>With trusted service providers who perform services on our behalf (e.g., analytics, cloud hosting).</li>
                <li>If required by law or to protect our legal rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">4. Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your data. 
                All sensitive data is encrypted during transmission, and access is restricted to authorized personnel.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">5. Your Choices</h2>
              <p>You can manage your privacy preferences as follows:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You can opt out of personalized analytics or ads through device settings or in-app options.</li>
                <li>You can request deletion of your personal data by contacting us at <a href="mailto:support@astrotruth.com" className="text-blue-600 underline">support@astrotruth.com</a>.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">6. Children’s Privacy</h2>
              <p>
                Our apps are not intended for children under 13. We do not knowingly collect personal data from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">7. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted in the app and on our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">8. Contact Us</h2>
              <p>
                If you have questions or concerns about your data or this policy, contact us at:
              </p>
              <div className="pl-4 mt-2">
                <p><strong>Astrotruth India Pvt. Ltd.</strong></p>
                <p>Email: <a href="mailto:support@astrotruth.com" className="text-blue-600 underline">support@astrotruth.com</a></p>
                <p>Website: <a href="https://www.astrotruth.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://www.astrotruth.com/privacy-policy</a></p>
              </div>
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
