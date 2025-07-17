import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Star, Sun, Moon, TrendingUp, Heart, Briefcase, UserCircle, Info } from 'lucide-react';
import axios from 'axios';

const zodiacSigns = [
  { name: "Aries", icon: UserCircle, date: "Mar 21 - Apr 19" },
  { name: "Taurus", icon: UserCircle, date: "Apr 20 - May 20" },
  { name: "Gemini", icon: UserCircle, date: "May 21 - Jun 20" },
  { name: "Cancer", icon: UserCircle, date: "Jun 21 - Jul 22" },
  { name: "Leo", icon: UserCircle, date: "Jul 23 - Aug 22" },
  { name: "Virgo", icon: UserCircle, date: "Aug 23 - Sep 22" },
  { name: "Libra", icon: UserCircle, date: "Sep 23 - Oct 22" },
  { name: "Scorpio", icon: UserCircle, date: "Oct 23 - Nov 21" },
  { name: "Sagittarius", icon: UserCircle, date: "Nov 22 - Dec 21" },
  { name: "Capricorn", icon: UserCircle, date: "Dec 22 - Jan 19" },
  { name: "Aquarius", icon: UserCircle, date: "Jan 20 - Feb 18" },
  { name: "Pisces", icon: UserCircle, date: "Feb 19 - Mar 20" }
];

const HoroscopePage = () => {
  const { type } = useParams();
  const [selectedZodiac, setSelectedZodiac] = useState(zodiacSigns[0]);
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleZodiacSelect = async (sign) => {
    setSelectedZodiac(sign);
    setHoroscopeData(null);
    setLoading(true);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB');

    try {
      const response = await axios.post('https://astro-talk-backend.onrender.com/prediction/daily', {
        zodiacName: sign.name,
        date: formattedDate,
      });
      setHoroscopeData(response.data.response);
    } catch (error) {
      console.error("❌ API Error:", error?.response?.data || error.message);
      setHoroscopeData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 mt-14" style={{ backgroundColor: 'hsl(var(--light-red-secondary))' }}>
      <motion.div className="max-w-6xl mx-auto" animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="shadow-2xl rounded-xl overflow-hidden border border-primary-theme">
          <CardHeader className="text-center p-6 sm:p-8 bg-gradient-to-br from-red-400 via-pink-400 to-rose-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
            >
              <Star className="h-14 w-14 sm:h-16 sm:w-16 text-primary-theme" />
            </motion.div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 md:p-10 bg-white">
            {/* Zodiac Sign Selection */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 text-center">Choose Your Zodiac Sign</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                {zodiacSigns.map((sign) => (
                  <motion.div
                    key={sign.name}
                    whileHover={{ scale: 1.05 }}
                    className={`p-2 sm:p-3 border rounded-lg cursor-pointer text-center transition-all duration-200 text-sm
                      ${selectedZodiac.name === sign.name ? 'border-primary-theme bg-red-50 shadow-md' : 'border-gray-200 hover:border-red-300'}`}
                    onClick={() => handleZodiacSelect(sign)}
                  >
                    {React.createElement(sign.icon, {
                      className: `w-10 h-10 mx-auto mb-1 ${selectedZodiac.name === sign.name ? 'text-primary-theme' : 'text-gray-500'}`
                    })}
                    <p className={`font-medium text-sm ${selectedZodiac.name === sign.name ? 'text-primary-theme' : 'text-gray-700'}`}>{sign.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {loading && <p className="text-center text-gray-600 mt-4">🔮 कुंडली प्राप्त की जा रही है...</p>}

            {horoscopeData && (
              <motion.div
                key={selectedZodiac.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-4 sm:p-6 border border-red-200 rounded-lg bg-rose-50 shadow-inner"
              >
                <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
                  {React.createElement(selectedZodiac.icon, { className: "w-14 h-14 sm:w-16 sm:h-16 text-primary-theme" })}
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary-theme">{selectedZodiac.name}</h2>
                    <p className="text-gray-600 text-sm">
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <HoroscopeAspect icon={Heart} title="Love" text={horoscopeData.love || 'Not available'} color="text-pink-500" />
                  <HoroscopeAspect icon={Briefcase} title="Career" text={horoscopeData.career || 'Not available'} color="text-blue-500" />
                  <HoroscopeAspect icon={Sun} title="Health" text={horoscopeData.health || 'Not available'} color="text-green-500" />
                  <HoroscopeAspect icon={TrendingUp} title="Lucky color" text={horoscopeData.lucky_color || 'Not available'} color="text-yellow-600" />
                  <span className='w-5 p-3 h-5 inline-block rounded-full border' style={{ backgroundColor: horoscopeData.lucky_color_code }} ></span>
                  <HoroscopeAspect icon={TrendingUp} title="Finance" text={horoscopeData.finances || 'Not available'} color="text-yellow-600" />
                  <HoroscopeAspect icon={Info} title="Information" text={horoscopeData.bot_response || 'Not available'} color="text-yellow-600" />
                </div>

                {horoscopeData.tip && (
                  <div className="mt-6 p-4 bg-red-100 border-l-4 border-primary-theme rounded">
                    <p className="font-semibold text-red-700">✨ एस्ट्रो टिप:</p>
                    <p className="text-gray-700">{horoscopeData.tip}</p>
                  </div>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const HoroscopeAspect = ({ icon, title, text, color }) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3">
      <Icon className={`w-6 h-6 ${color} mt-1`} />
      <div>
        <h4 className={`text-base sm:text-lg font-semibold ${color}`}>{title}</h4>
        <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default HoroscopePage;
