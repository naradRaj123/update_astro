import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  Briefcase, 
  Sun, 
  TrendingUp, 
  Info, 
  Palette, 
  Hash, 
  Star, 
  DollarSign, 
  Activity, 
  Users, 
  Smile, 
  MapPin, 
  User ,
  UserCircle
} from 'lucide-react';
import axios from 'axios';

const zodiacSigns = [
  { name: "Aries", icon: UserCircle, value: 1 },
  { name: "Taurus", icon: UserCircle, value: 2 },
  { name: "Gemini", icon: UserCircle, value: 3 },
  { name: "Cancer", icon: UserCircle, value: 4 },
  { name: "Leo", icon: UserCircle, value: 5 },
  { name: "Virgo", icon: UserCircle, value: 6 },
  { name: "Libra", icon: UserCircle, value: 7 },
  { name: "Scorpio", icon: UserCircle, value: 8 },
  { name: "Sagittarius", icon: UserCircle, value: 9 },
  { name: "Capricorn", icon: UserCircle, value: 10 },
  { name: "Aquarius", icon: UserCircle, value: 11 },
  { name: "Pisces", icon: UserCircle, value: 12 }
];

const HoroscopePage = () => {
  const [selectedZodiac, setSelectedZodiac] = useState(zodiacSigns[0]);
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [weeklyHoroscopeData, setWeeklyHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('today'); // 'today', 'thisweek', 'nextweek'

  const handleZodiacSelect = async (sign) => {
    setSelectedZodiac(sign);
    setHoroscopeData(null);
    setWeeklyHoroscopeData(null);
    setSelectedPeriod('today');
    await fetchTodaysHoroscope(sign);
  };

  const fetchTodaysHoroscope = async (sign) => {
    setLoading(true);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB'); // DD/MM/YYYY

    const params = {
      zodiac: sign.value,
      date: formattedDate,
      api_key: "349e48af-b57e-58aa-ad9c-623f1ab5a5f7",
      split: true,
      type: "big",
      lang: "en"
    };
    
    try {
      const response = await axios.get('https://api.vedicastroapi.com/v3-json/prediction/daily-sun', {params});
      setHoroscopeData(response.data.response);
      setWeeklyHoroscopeData(null); // Clear weekly data when switching to today
    } catch (error) {
      console.error("❌ API Error:", error?.response?.data || error.message);
      setHoroscopeData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyHoroscope = async (weekType) => {
    setLoading(true);
    setSelectedPeriod(weekType);
    
    const params = {
      zodiac: selectedZodiac.value,
      api_key: "349e48af-b57e-58aa-ad9c-623f1ab5a5f7",
      week: weekType === 'thisweek' ? 'thisweek' : 'nextweek',
      type: "big",
      lang: "en"
    };
    
    try {
      const response = await axios.get('https://api.vedicastroapi.com/v3-json/prediction/weekly-sun', {params});
      setWeeklyHoroscopeData({
        ...response.data.response,
        weekType: weekType
      });
      setHoroscopeData(null); // Clear daily data when switching to weekly
    } catch (error) {
      console.error("❌ Weekly API Error:", error?.response?.data || error.message);
      setWeeklyHoroscopeData(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    if (period === 'today') {
      fetchTodaysHoroscope(selectedZodiac);
    } else {
      fetchWeeklyHoroscope(period);
    }
  };

  return (
    <div className="min-h-screen py-4 md:p-8 mt-14" style={{ backgroundColor: 'hsl(var(--light-red-secondary))' }}>
      <motion.div
        className=" mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-primary-theme">
          <CardHeader className="text-center p-8 bg-gradient-to-br from-red-400 via-pink-400 to-rose-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
            >
              <Star className="h-16 w-16 text-primary-theme" />
            </motion.div>
          </CardHeader>

          <CardContent className="p-6 md:p-10 bg-white">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">अपना राशि चिन्ह चुनें</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {zodiacSigns.map((sign) => (
                  <motion.div
                    key={sign.name}
                    whileHover={{ scale: 1.05 }}
                    className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all duration-200
                      ${selectedZodiac.name === sign.name ? 'border-primary-theme bg-red-50 shadow-md' : 'border-gray-200 hover:border-red-300'}`}
                    onClick={() => handleZodiacSelect(sign)}
                  >
                    {React.createElement(sign.icon, {
                      className: `w-10 h-10 mx-auto mb-1 ${selectedZodiac.name === sign.name ? 'text-primary-theme' : 'text-gray-500'}`
                    })}
                    <p className={`font-medium text-sm ${selectedZodiac.name === sign.name ? 'text-primary-theme' : 'text-gray-700'}`}>{sign.name}</p>
                    {/* <p className="text-xs text-gray-500">{sign.date}</p> */}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Period Selection Buttons */}
            {(horoscopeData || weeklyHoroscopeData) && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-6"
              >
                <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
                  {[
                    { key: 'today', label: "Today's Horoscope" },
                    { key: 'thisweek', label: 'This Week' },
                    { key: 'nextweek', label: 'Next Week' }
                  ].map((period) => (
                    <button
                      key={period.key}
                      onClick={() => handlePeriodChange(period.key)}
                      className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                        selectedPeriod === period.key
                          ? 'bg-primary-theme text-gray-700 shadow-md'
                          : 'text-gray-400 hover:text-primary-theme hover:bg-white'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {loading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-full border border-red-200">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-theme"></div>
                  <p className="text-gray-600 font-medium">🔮 कुंडली प्राप्त की जा रही है...</p>
                </div>
              </div>
            )}

            {/* Today's Horoscope */}
            {horoscopeData && selectedPeriod === 'today' && (
              <TodaysHoroscope 
                selectedZodiac={selectedZodiac} 
                horoscopeData={horoscopeData} 
              />
            )}

            {/* Weekly Horoscope */}
            {weeklyHoroscopeData && (selectedPeriod === 'thisweek' || selectedPeriod === 'nextweek') && (
              <WeeklyHoroscope 
                selectedZodiac={selectedZodiac} 
                weeklyData={weeklyHoroscopeData} 
              />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const TodaysHoroscope = ({ selectedZodiac, horoscopeData }) => {
  return (
              <motion.div
                key={`today-${selectedZodiac.name}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-6 border border-red-200 rounded-lg bg-rose-50 shadow-inner"
              >
                <div className="flex items-center mb-6">
                  {React.createElement(selectedZodiac.icon, { className: "w-16 h-16 text-primary-theme mr-4" })}
                  <div>
                    <h2 className="text-2xl font-bold text-primary-theme">{selectedZodiac.name}</h2>
                    <p className="text-gray-600 text-md">
                      {new Date().toLocaleDateString('hi-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Lucky Color & Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                    <div className="flex items-center mb-2">
                      <Palette className="w-5 h-5 text-purple-500 mr-2" />
                      <h3 className="font-semibold text-gray-700">Lucky Color</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
                        style={{ backgroundColor: horoscopeData.lucky_color_code }}
                      ></div>
                      <span className="font-medium text-gray-800 capitalize">{horoscopeData.lucky_color}</span>
                      <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {horoscopeData.lucky_color_code}
                      </code>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                    <div className="flex items-center mb-2">
                      <Hash className="w-5 h-5 text-blue-500 mr-2" />
                      <h3 className="font-semibold text-gray-700">Lucky Numbers</h3>
                    </div>
                    <div className="flex gap-2">
                      {horoscopeData.lucky_number.map((number, index) => (
                        <span
                          key={index}
                          className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full border-2 border-blue-200"
                        >
                          {number}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Overall Score */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="w-6 h-6 text-yellow-500 mr-2" />
                      <h3 className="text-xl font-bold text-gray-800">Overall Score</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600">
                        {horoscopeData.bot_response.total_score.score}/100
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${horoscopeData.bot_response.total_score.score}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                    {horoscopeData.bot_response.total_score.split_response}
                  </p>
                </div>

                {/* Horoscope Aspects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <HoroscopeAspect
                    icon={Heart}
                    title="Relationship"
                    score={horoscopeData.bot_response.relationship.score}
                    text={horoscopeData.bot_response.relationship.split_response}
                    color="text-pink-500"
                    bgColor="bg-pink-50"
                  />
                  <HoroscopeAspect
                    icon={Briefcase}
                    title="Career"
                    score={horoscopeData.bot_response.career.score}
                    text={horoscopeData.bot_response.career.split_response}
                    color="text-blue-500"
                    bgColor="bg-blue-50"
                  />
                  <HoroscopeAspect
                    icon={DollarSign}
                    title="Finances"
                    score={horoscopeData.bot_response.finances.score}
                    text={horoscopeData.bot_response.finances.split_response}
                    color="text-green-500"
                    bgColor="bg-green-50"
                  />
                  <HoroscopeAspect
                    icon={Activity}
                    title="Health"
                    score={horoscopeData.bot_response.health.score}
                    text={horoscopeData.bot_response.health.split_response}
                    color="text-red-500"
                    bgColor="bg-red-50"
                  />
                  <HoroscopeAspect
                    icon={Users}
                    title="Family"
                    score={horoscopeData.bot_response.family.score}
                    text={horoscopeData.bot_response.family.split_response}
                    color="text-purple-500"
                    bgColor="bg-purple-50"
                  />
                  <HoroscopeAspect
                    icon={Smile}
                    title="Friends"
                    score={horoscopeData.bot_response.friends.score}
                    text={horoscopeData.bot_response.friends.split_response}
                    color="text-orange-500"
                    bgColor="bg-orange-50"
                  />
                  <HoroscopeAspect
                    icon={MapPin}
                    title="Travel"
                    score={horoscopeData.bot_response.travel.score}
                    text={horoscopeData.bot_response.travel.split_response}
                    color="text-cyan-500"
                    bgColor="bg-cyan-50"
                  />
                  <HoroscopeAspect
                    icon={User}
                    title="Physique"
                    score={horoscopeData.bot_response.physique.score}
                    text={horoscopeData.bot_response.physique.split_response}
                    color="text-indigo-500"
                    bgColor="bg-indigo-50"
                  />
                </div>

                {/* Status Section */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-blue-700 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Daily Status
                    </h3>
                    <span className="text-lg font-bold text-blue-600">
                      {horoscopeData.bot_response.status.score}/100
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {horoscopeData.bot_response.status.split_response}
                  </p>
                </div>
              </motion.div>
            )};


const HoroscopeAspect = ({ icon, title, text, color, bgColor, score }) => {
  const Icon = icon;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`p-4 rounded-lg border ${bgColor} border-opacity-50 transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <Icon className={`w-6 h-6 ${color} mr-3 flex-shrink-0`} />
          <h4 className={`text-lg font-semibold ${color}`}>{title}</h4>
        </div>
        <div className="text-right">
          <span className={`text-sm font-bold ${getScoreColor(score)}`}>
            {score}/100
          </span>
          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full ${getScoreBg(score)}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm">{text}</p>
    </div>
  );
};

const WeeklyHoroscope = ({ selectedZodiac, weeklyData }) => {
  const getWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    if (weeklyData.weekType === 'nextweek') {
      startOfWeek.setDate(startOfWeek.getDate() + 7);
      endOfWeek.setDate(endOfWeek.getDate() + 7);
    }
    
    return {
      start: startOfWeek.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' }),
      end: endOfWeek.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
  };

  const weekRange = getWeekRange();

  return (
    <motion.div
      key={`${weeklyData.weekType}-${selectedZodiac.name}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 p-6 border border-blue-200 rounded-lg bg-blue-50 shadow-inner"
    >
      <div className="flex items-center mb-6">
        {React.createElement(selectedZodiac.icon, { className: "w-16 h-16 text-blue-600 mr-4" })}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">{selectedZodiac.name}</h2>
          <p className="text-gray-600 text-md">
            {weeklyData.weekType === 'thisweek' ? 'This Week' : 'Next Week'} ({weekRange.start} - {weekRange.end})
          </p>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Weekly Overall Score</h3>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">
              {weeklyData.total_score}/100
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${weeklyData.total_score}%` }}
          ></div>
        </div>
      </div>

      {/* Lucky Color & Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
          <div className="flex items-center mb-2">
            <Palette className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className="font-semibold text-gray-700">Lucky Color</h3>
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
              style={{ backgroundColor: weeklyData.lucky_color_code }}
            ></div>
            <span className="font-medium text-gray-800 capitalize">{weeklyData.lucky_color}</span>
            <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {weeklyData.lucky_color_code}
            </code>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
          <div className="flex items-center mb-2">
            <Hash className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="font-semibold text-gray-700">Lucky Numbers</h3>
          </div>
          <div className="flex gap-2">
            {weeklyData.lucky_number.map((number, index) => (
              <span 
                key={index}
                className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full border-2 border-blue-200"
              >
                {number}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Aspects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <WeeklyAspect title="Career" score={weeklyData.career} />
        <WeeklyAspect title="Relationship" score={weeklyData.relationship} />
        <WeeklyAspect title="Finances" score={weeklyData.finances} />
        <WeeklyAspect title="Health" score={weeklyData.health} />
        <WeeklyAspect title="Family" score={weeklyData.family} />
        <WeeklyAspect title="Friends" score={weeklyData.friends} />
        <WeeklyAspect title="Travel" score={weeklyData.travel} />
        <WeeklyAspect title="Status" score={weeklyData.status} />
      </div>

      {/* Detailed Prediction */}
      <div className="bg-white p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Weekly Prediction
        </h3>
        <p className="text-gray-700 leading-relaxed text-justify">
          {weeklyData.bot_response}
        </p>
      </div>
    </motion.div>
  );
};

// Weekly Aspect Component
const WeeklyAspect = ({ title, score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-500 bg-yellow-50 border-yellow-200';
    if (score >= 40) return 'text-orange-500 bg-orange-50 border-orange-200';
    return 'text-red-500 bg-red-50 border-red-200';
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className={`p-3 rounded-lg border text-center transition-all duration-200 hover:shadow-md ${scoreColor}`}>
      <h4 className="font-semibold text-gray-700 text-sm mb-2">{title}</h4>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{score}/100</span>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${score}%`,
              backgroundColor: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : score >= 40 ? '#F97316' : '#EF4444'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HoroscopePage;