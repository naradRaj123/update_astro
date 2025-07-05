import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Sun, Moon, TrendingUp, Heart, Briefcase, UserCircle } from 'lucide-react';

const zodiacSigns = [
  { name: "Aries", icon: UserCircle, date: "Mar 21 - Apr 19" }, { name: "Taurus", icon: UserCircle, date: "Apr 20 - May 20" }, 
  { name: "Gemini", icon: UserCircle, date: "May 21 - Jun 20" }, { name: "Cancer", icon: UserCircle, date: "Jun 21 - Jul 22" },
  { name: "Leo", icon: UserCircle, date: "Jul 23 - Aug 22" }, { name: "Virgo", icon: UserCircle, date: "Aug 23 - Sep 22" },
  { name: "Libra", icon: UserCircle, date: "Sep 23 - Oct 22" }, { name: "Scorpio", icon: UserCircle, date: "Oct 23 - Nov 21" },
  { name: "Sagittarius", icon: UserCircle, date: "Nov 22 - Dec 21" }, { name: "Capricorn", icon: UserCircle, date: "Dec 22 - Jan 19" },
  { name: "Aquarius", icon: UserCircle, date: "Jan 20 - Feb 18" }, { name: "Pisces", icon: UserCircle, date: "Feb 19 - Mar 20" }
];

const HoroscopePage = () => {
  const { type } = useParams(); // e.g., today-horoscope
  const [selectedZodiac, setSelectedZodiac] = React.useState(zodiacSigns[0]);

  const horoscopeDetails = {
    love: "Your love life looks promising today. Open communication will strengthen your bond.",
    career: "A new opportunity might present itself at work. Be prepared to seize it.",
    health: "Focus on maintaining a balanced diet and regular exercise for optimal health.",
    finance: "Good day for financial planning. Avoid impulsive spending.",
    tip: "Embrace change and be open to new experiences."
  };

  const handleZodiacSelect = (sign) => {
    setSelectedZodiac(sign);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 mt-16 pb-10 bg-[hsl(var(--light-red-secondary))]">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
            {/* Optional Title */}
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
                      className: `w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 ${
                        selectedZodiac.name === sign.name ? 'text-primary-theme' : 'text-gray-500'
                      }`
                    })}
                    <p className={`${selectedZodiac.name === sign.name ? 'text-primary-theme' : 'text-gray-700'} font-medium`}>{sign.name}</p>
                    <p className="text-[11px] text-gray-500">{sign.date}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Horoscope Display */}
            {selectedZodiac && (
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
                  <HoroscopeAspect icon={Heart} title="Love" text={horoscopeDetails.love} color="text-pink-500" />
                  <HoroscopeAspect icon={Briefcase} title="Career" text={horoscopeDetails.career} color="text-blue-500" />
                  <HoroscopeAspect icon={Sun} title="Health" text={horoscopeDetails.health} color="text-green-500" />
                  <HoroscopeAspect icon={TrendingUp} title="Finance" text={horoscopeDetails.finance} color="text-yellow-600" />
                </div>

                <div className="mt-6 p-4 bg-red-100 border-l-4 border-primary-theme rounded">
                  <p className="font-semibold text-red-700">✨ Astro Tip:</p>
                  <p className="text-gray-700 text-sm">{horoscopeDetails.tip}</p>
                </div>
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
