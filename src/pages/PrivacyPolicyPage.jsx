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
              Your privacy is important to us. Last updated: {new Date().toLocaleDateString()}.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-10 space-y-6 bg-white text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">1. Introduction</h2>
              <p>Welcome to Astrotruth. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">2. Information We Collect</h2>
              <p>We collect personal information that you voluntarily provide to us when registering at the Astrotruth, expressing an interest in obtaining information about us or our products and services, when participating in activities on the Astrotruth or otherwise contacting us. This may include name, birth details, email address, phone number, and payment information.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">3. How We Use Your Information</h2>
              <p>We use personal information collected via our Astrotruth for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">4. Will Your Information Be Shared With Anyone?</h2>
              <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share your data with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">5. How Long Do We Keep Your Information?</h2>
              <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">6. How Do We Keep Your Information Safe?</h2>
              <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">7. Your Privacy Rights</h2>
              <p>In some regions (like the European Economic Area), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">8. Updates To This Policy</h2>
              <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">9. How Can You Contact Us About This Policy?</h2>
              <p>If you have questions or comments about this policy, you may email us at privacy@astrotruth.com or by post to: Astrotruth, Attn: Privacy Officer, 123 Astro Lane, Cosmic City, Universe 78901.</p>
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;