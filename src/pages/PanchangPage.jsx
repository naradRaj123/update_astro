import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Sunrise, Sunset, Moon, Star, Clock, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PanchangDetailItem = ({ icon, label, value, color = "text-primary-theme" }) => {
  const Icon = icon;
  return (
    <motion.div 
      className="flex items-center p-3 bg-red-50 rounded-lg shadow-sm border border-red-200"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className={`w-7 h-7 ${color} mr-3 flex-shrink-0`} />
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
};

const PanchangPage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = React.useState(today.toISOString().split('T')[0]);
  const [location, setLocation] = React.useState("New Delhi, India");

  // Dummy data, replace with actual API call
  const panchangData = {
    date: new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    sunrise: "05:45 AM",
    sunset: "07:15 PM",
    moonrise: "08:30 PM",
    moonset: "07:00 AM",
    tithi: "Krishna Paksha, Dwitiya",
    nakshatra: "Rohini",
    yoga: "Vaidhriti",
    karana: "Taitila",
    rahukaal: "10:30 AM - 12:00 PM",
    gulikaal: "07:30 AM - 09:00 AM",
    yamghantkaal: "03:00 PM - 04:30 PM",
    abhijitMuhurat: "11:50 AM - 12:40 PM",
  };

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
              <CalendarDays className="h-16 w-16 text-primary-theme" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-white">Daily Panchang</CardTitle>
            <CardDescription className="text-lg text-red-100 mt-2">
              Auspicious timings and Hindu calendar details for your location.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-10 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="panchang-date" className="text-md font-medium text-gray-700 block mb-1">Select Date</Label>
                <Input 
                  type="date" 
                  id="panchang-date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-lg p-2.5 w-full focus:ring-primary-theme focus:border-primary-theme" 
                />
              </div>
              <div>
                <Label htmlFor="panchang-location" className="text-md font-medium text-gray-700 block mb-1">Location</Label>
                <Input 
                  type="text" 
                  id="panchang-location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city name" 
                  className="text-lg p-2.5 w-full focus:ring-primary-theme focus:border-primary-theme" 
                />
              </div>
            </div>
            <Button className="w-full md:w-auto btn-primary-theme text-white font-semibold mb-8" size="lg" onClick={() => console.log("Fetch Panchang Data for", selectedDate, location)}>
              Get Panchang Details
            </Button>

            <motion.div 
              key={selectedDate + location} // Re-trigger animation on data change
              className="mt-4 p-6 border border-red-200 rounded-lg bg-rose-50 shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-primary-theme text-center mb-2">{panchangData.date}</h2>
              <p className="text-center text-gray-600 mb-6">Panchang for {location}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <PanchangDetailItem icon={Sunrise} label="Sunrise" value={panchangData.sunrise} color="text-orange-500" />
                <PanchangDetailItem icon={Sunset} label="Sunset" value={panchangData.sunset} color="text-red-600" />
                <PanchangDetailItem icon={Moon} label="Moonrise" value={panchangData.moonrise} color="text-blue-500" />
                <PanchangDetailItem icon={Moon} label="Moonset" value={panchangData.moonset} color="text-indigo-500" />
                <PanchangDetailItem icon={CalendarDays} label="Tithi" value={panchangData.tithi} />
                <PanchangDetailItem icon={Star} label="Nakshatra" value={panchangData.nakshatra} />
                <PanchangDetailItem icon={Star} label="Yoga" value={panchangData.yoga} color="text-purple-500" />
                <PanchangDetailItem icon={Star} label="Karana" value={panchangData.karana} color="text-teal-500" />
                <PanchangDetailItem icon={Clock} label="Abhijit Muhurat" value={panchangData.abhijitMuhurat} color="text-green-600"/>
              </div>
              <div className="mt-6 pt-6 border-t border-red-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">Inauspicious Timings (Ashubh Kaal)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <PanchangDetailItem icon={Clock} label="Rahu Kaal" value={panchangData.rahukaal} color="text-gray-600" />
                    <PanchangDetailItem icon={Clock} label="Gulika Kaal" value={panchangData.gulikaal} color="text-gray-600" />
                    <PanchangDetailItem icon={Clock} label="Yamghant Kaal" value={panchangData.yamghantkaal} color="text-gray-600" />
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PanchangPage;