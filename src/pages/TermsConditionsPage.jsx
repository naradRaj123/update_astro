import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const TermsConditionsPage = () => {
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
              <FileText className="h-16 w-16 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800">Terms & Conditions</CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-2">
              Please read these terms carefully before using our services. Last updated: {new Date().toLocaleDateString()}.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-10 space-y-6 bg-white text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">1. Acceptance of Terms</h2>
              <p>By accessing or using Astrotruth ("the Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of the terms, then you may not access the Service.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">2. Description of Service</h2>
              <p>Astrotruth provides astrological consultations, reports, and related products. The information provided is for guidance and entertainment purposes only and should not be considered as a substitute for professional advice (legal, medical, financial, etc.).</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">3. User Accounts</h2>
              <p>To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">4. Payments and Refunds</h2>
              <p>All payments for services and products are to be made through the payment methods provided on the platform. Refund policies for consultations, reports, and products will be specified at the point of purchase or in a separate refund policy document. Generally, services once rendered are non-refundable.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">5. User Conduct</h2>
              <p>You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. You agree to be respectful to astrologers and other users.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">6. Intellectual Property</h2>
              <p>The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Astrotruth and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Astrotruth.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">7. Disclaimer of Warranties</h2>
              <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Astrotruth makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">8. Limitation of Liability</h2>
              <p>In no event shall Astrotruth or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Astrotruth's website, even if Astrotruth or an Astrotruth authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">9. Changes to Terms</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">10. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at legal@astrotruth.com.</p>
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TermsConditionsPage;