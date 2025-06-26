import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookUser } from 'lucide-react';

const KundliPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8" style={{backgroundColor: 'hsl(var(--light-red-secondary))'}}>
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-primary-theme">
          <CardHeader className="text-center p-8 bg-gradient-to-br from-red-400 via-pink-400 to-rose-300" style={{backgroundColor: 'hsl(var(--light-red-primary))'}}>
             <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
            >
              <BookUser className="h-16 w-16 text-primary-theme" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-white">Free Kundli Generator</CardTitle>
            <CardDescription className="text-lg text-red-100 mt-2">
              Discover your cosmic blueprint. Enter your birth details to generate your personalized Kundli.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-10 space-y-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-md font-medium text-gray-700">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-md font-medium text-gray-700">Gender</Label>
                {/* Replace with Select component when available */}
                <Input id="gender" placeholder="Select gender (Male/Female/Other)" className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dob-day" className="text-md font-medium text-gray-700">Birth Day</Label>
                <Input id="dob-day" type="number" placeholder="DD" className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob-month" className="text-md font-medium text-gray-700">Birth Month</Label>
                <Input id="dob-month" type="number" placeholder="MM" className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob-year" className="text-md font-medium text-gray-700">Birth Year</Label>
                <Input id="dob-year" type="number" placeholder="YYYY" className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-2">
                <Label htmlFor="tob-hour" className="text-md font-medium text-gray-700">Birth Hour</Label>
                <Input id="tob-hour" type="number" placeholder="HH (24h)" className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tob-minute" className="text-md font-medium text-gray-700">Birth Minute</Label>
                <Input id="tob-minute" type="number" placeholder="MM" className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="tob-second" className="text-md font-medium text-gray-700">Birth Second (Optional)</Label>
                <Input id="tob-second" type="number" placeholder="SS" className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthPlace" className="text-md font-medium text-gray-700">Place of Birth</Label>
              <Input id="birthPlace" placeholder="Enter city and country" className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme" />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full text-xl py-4 btn-primary-theme text-white font-semibold" size="lg">
                Generate My Kundli
              </Button>
            </motion.div>

            <p className="text-center text-sm text-gray-600">
              By generating your Kundli, you agree to our <a href="/terms-of-service" className="text-primary-theme hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-primary-theme hover:underline">Privacy Policy</a>.
            </p>
          </CardContent>
        </Card>

        {/* Placeholder for Kundli result display */}
        <motion.div 
          className="mt-10 p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Your Kundli Details Will Appear Here</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-red-300 rounded-lg">
            <p className="text-gray-400 text-lg">Awaiting birth details...</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KundliPage;