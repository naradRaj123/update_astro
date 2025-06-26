import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
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
              <Mail className="h-16 w-16 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800">Get In Touch</CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-2">
              We'd love to hear from you! Reach out with any questions or feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-yellow-600">Contact Information</h2>
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-yellow-500" />
                <p className="text-gray-700">123 Astro Lane, Cosmic City, Universe 78901</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-yellow-500" />
                <p className="text-gray-700">+1 (234) 567-8900</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-yellow-500" />
                <p className="text-gray-700">support@astrotruth.com</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-yellow-600 mb-2">Office Hours</h3>
                <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-700">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-700">Sunday: Closed</p>
              </div>
            </div>
            <form className="space-y-6">
              <h2 className="text-2xl font-semibold text-yellow-600">Send Us a Message</h2>
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                <Input id="name" placeholder="Your Name" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</Label>
                <Input id="subject" placeholder="Regarding..." className="mt-1 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} className="mt-1 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <Button type="submit" className="w-full btn-primary-theme text-gray-800 font-semibold text-lg py-3">
                <Send className="mr-2 h-5 w-5" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContactPage;