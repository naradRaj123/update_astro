import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, HeartHandshake } from 'lucide-react';

const MatchmakingPage = () => {
  const InputField = ({ id, label, placeholder, type = "text" }) => (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-sm font-medium text-gray-600">{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} className="text-base p-2.5 focus:ring-primary-theme focus:border-primary-theme" />
    </div>
  );

  const BirthDetailsForm = ({ title }) => (
    <Card className="shadow-lg rounded-lg border border-red-200">
      <CardHeader className="bg-red-50 p-4">
        <CardTitle className="text-lg font-semibold text-primary-theme flex items-center">
          <Users className="mr-2 h-5 w-5" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <InputField id={`${title.toLowerCase().replace(' ', '')}-name`} label="Full Name" placeholder="Enter full name" />
        <div className="grid grid-cols-3 gap-3">
          <InputField id={`${title.toLowerCase().replace(' ', '')}-day`} label="Day" placeholder="DD" type="number" />
          <InputField id={`${title.toLowerCase().replace(' ', '')}-month`} label="Month" placeholder="MM" type="number" />
          <InputField id={`${title.toLowerCase().replace(' ', '')}-year`} label="Year" placeholder="YYYY" type="number" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <InputField id={`${title.toLowerCase().replace(' ', '')}-hour`} label="Hour (24h)" placeholder="HH" type="number" />
          <InputField id={`${title.toLowerCase().replace(' ', '')}-minute`} label="Minute" placeholder="MM" type="number" />
        </div>
        <InputField id={`${title.toLowerCase().replace(' ', '')}-place`} label="Place of Birth" placeholder="City, Country" />
      </CardContent>
    </Card>
  );

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
              <HeartHandshake className="h-16 w-16 text-primary-theme" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-white">Kundli Matching (Vivah Milan)</CardTitle>
            <CardDescription className="text-lg text-red-100 mt-2">
              Check marital compatibility based on Vedic astrology principles.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-10 space-y-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BirthDetailsForm title="Boy's Details" />
              <BirthDetailsForm title="Girl's Details" />
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6"
            >
              <Button className="w-full text-xl py-4 btn-primary-theme text-white font-semibold" size="lg">
                Match Kundlis
              </Button>
            </motion.div>

             <p className="text-center text-sm text-gray-600">
              Matchmaking results are based on traditional Ashtakoot Milan. For detailed analysis, consult an astrologer.
            </p>
          </CardContent>
        </Card>

        {/* Placeholder for Matchmaking result display */}
        <motion.div 
          className="mt-10 p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Matchmaking Report Will Appear Here</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-red-300 rounded-lg">
            <p className="text-gray-400 text-lg">Enter birth details of boy and girl to see compatibility.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MatchmakingPage;