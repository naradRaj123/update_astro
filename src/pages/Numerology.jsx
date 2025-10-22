import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Sparkles,
  User,
  Calendar,
  Hash,
  Star,
  Target,
  Heart,
  Brain,
  Zap,
  Crown,
  Share2,
  Download,
  RefreshCw,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import axios from "axios";

const NumerologyCalculator = () => {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState("lifePath");
  const VEDIC_API_KEY = "349e48af-b57e-58aa-ad9c-623f1ab5a5f7";

  function formatDate(dateString) {
  const [year, month, day] = dateString.split("/");
  return `${day}/${month}/${year}`;
}


  // Calculate Life Path Number
  const calculateLifePathNumber = (date) => {
    const [year, month, day] = date.split('-').map(Number);

    const reduceNumber = (num) => {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      }
      return num;
    };

    const dayReduced = reduceNumber(day);
    const monthReduced = reduceNumber(month);
    const yearReduced = reduceNumber(year);

    let lifePath = dayReduced + monthReduced + yearReduced;

    // Check for master numbers before final reduction
    if ([11, 22, 33].includes(lifePath)) {
      return lifePath;
    }

    return reduceNumber(lifePath);
  };

  // Calculate Destiny Number from name
  const calculateDestinyNumber = (name) => {
    const numerologyChart = {
      'a': 1, 'j': 1, 's': 1,
      'b': 2, 'k': 2, 't': 2,
      'c': 3, 'l': 3, 'u': 3,
      'd': 4, 'm': 4, 'v': 4,
      'e': 5, 'n': 5, 'w': 5,
      'f': 6, 'o': 6, 'x': 6,
      'g': 7, 'p': 7, 'y': 7,
      'h': 8, 'q': 8, 'z': 8,
      'i': 9, 'r': 9
    };

    const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
    let total = 0;

    for (let char of cleanName) {
      total += numerologyChart[char] || 0;
    }

    const reduceNumber = (num) => {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      }
      return num;
    };

    return reduceNumber(total);
  };

  // Calculate other numbers
  const calculateSoulUrgeNumber = (name) => {
    const vowels = 'aeiou';
    const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
    let vowelSum = 0;

    for (let char of cleanName) {
      if (vowels.includes(char)) {
        vowelSum += char.charCodeAt(0) - 96; // a=1, b=2, etc.
      }
    }

    const reduceNumber = (num) => {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      }
      return num;
    };

    return reduceNumber(vowelSum);
  };

  const calculatePersonalityNumber = (name) => {
    const vowels = 'aeiou';
    const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
    let consonantSum = 0;

    for (let char of cleanName) {
      if (!vowels.includes(char)) {
        consonantSum += char.charCodeAt(0) - 96;
      }
    }

    const reduceNumber = (num) => {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      }
      return num;
    };

    return reduceNumber(consonantSum);
  };

  const handleCalculate = async () => {
    if (!fullName.trim() || !birthDate) {
      alert("Please enter your full name and birth date!");
      return;
    }

    setIsCalculating(true);

    const params = {
      api_key: VEDIC_API_KEY,
      name: fullName,
      date: formatDate(birthDate),
      lang: "en"
    }
    try {
      const response = await axios.get("https://api.vedicastroapi.com/v3-json/prediction/numerology", {params})

      console.log("this is the result", response?.data)
      setResult(response?.data?.response);

    } catch (e) {
      console.log("error", e)
    }

    setTimeout(() => {
      const lifePath = calculateLifePathNumber(birthDate);
      const destiny = calculateDestinyNumber(fullName);
      const soulUrge = calculateSoulUrgeNumber(fullName);
      const personality = calculatePersonalityNumber(fullName);

      const newResult = {
        lifePath,
        destiny,
        soulUrge,
        personality,
        fullName: fullName.trim(),
        birthDate,
        timestamp: new Date().toLocaleString()
      };

      setIsCalculating(false);
    }, 2000);
  };

  const handleRandomGenerate = () => {
    const randomNames = [
      "Priya Sharma", "Raj Kumar", "Anjali Patel", "Amit Singh",
      "Sonia Gupta", "Rahul Verma", "Maya Reddy", "Arjun Joshi",
      "Neha Kapoor", "Vikram Malhotra", "Kavita Choudhary", "Sanjay Mehta"
    ];

    const randomDates = [
      "1990-05-15", "1985-12-08", "1992-07-22", "1988-03-30",
      "1995-11-14", "1987-09-05", "1993-02-18", "1991-08-25"
    ];

    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomDate = randomDates[Math.floor(Math.random() * randomDates.length)];

    setFullName(randomName);
    setBirthDate(randomDate);
  };

  const getNumberColor = (number) => {
    const colors = {
      1: "from-red-500 to-orange-500",
      2: "from-orange-500 to-yellow-500",
      3: "from-yellow-500 to-green-500",
      4: "from-green-500 to-teal-500",
      5: "from-teal-500 to-blue-500",
      6: "from-blue-500 to-indigo-500",
      7: "from-indigo-500 to-purple-500",
      8: "from-purple-500 to-pink-500",
      9: "from-pink-500 to-red-500",
      11: "from-purple-500 to-blue-500",
      22: "from-blue-500 to-green-500",
      33: "from-green-500 to-yellow-500"
    };
    return colors[number] || "from-gray-500 to-gray-700";
  };

  const NumberCard = ({ number, title, description, data }) => (
    <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
      <CardHeader className={cn("text-white", `bg-gradient-to-r ${getNumberColor(number)}`)}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hash className="h-6 w-6" />
            <span>{title} Number</span>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {number}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-700 mb-4">{description}</p>

        
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200 text-sm font-medium">
            <Sparkles className="h-3 w-3 mr-1" />
            Cosmic Numerology Calculator
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Your <span className="text-purple-600">Numerology Numbers</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock the secrets of your personality, destiny, and life path through the ancient wisdom of numerology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Calculator className="h-6 w-6" />
                  <span>Your Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="h-4 w-4 mr-2 text-purple-500" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="rounded-xl border-gray-300 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                    Birth Date
                  </label>
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(e) => {setBirthDate(e.target.value)
                      console.log("date value when select", e.target.value)
                    }}
                    className="rounded-xl border-gray-300 focus:border-purple-500"
                  />
                </div>

                <div className="flex flex-col space-y-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className={cn(
                      "w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg",
                      isCalculating && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {isCalculating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Calculate Numbers
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleRandomGenerate}
                    variant="outline"
                    className="w-full rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate Random
                  </Button>
                </div>

                {/* Quick Guide */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                    Quick Guide
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <Hash className="h-4 w-4 text-purple-500 mt-0.5" />
                      <span><strong>Life Path:</strong> Your life's purpose</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Crown className="h-4 w-4 text-purple-500 mt-0.5" />
                      <span><strong>Destiny:</strong> Your natural talents</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Heart className="h-4 w-4 text-purple-500 mt-0.5" />
                      <span><strong>Soul Urge:</strong> Your inner desires</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Brain className="h-4 w-4 text-purple-500 mt-0.5" />
                      <span><strong>Personality:</strong> How others see you</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            <AnimatePresence>
              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  {/* Summary Card */}
                  <Card className="shadow-lg border-0 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                          <h2 className="text-2xl font-bold mb-2">
                            {fullName}'s Numerology Profile
                          </h2>
                          <p className="text-purple-100">
                            Born on {new Date(birthDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-4">
                          <div className="text-center">
                            {/* <div className="text-3xl font-bold">{result.lifePath}</div> */}
                            <div className="text-sm text-purple-100">Life Path</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold">{result.destiny.number}</div>
                            <div className="text-sm text-purple-100">Destiny</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold">{result.soul.number}</div>
                            <div className="text-sm text-purple-100">Soul Urge</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tabs for Different Numbers */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid grid-cols-4 gap-2 bg-gray-100 p-1 rounded-2xl">
                      <TabsTrigger value="lifePath" className="rounded-xl">
                        Life Path
                      </TabsTrigger>
                      <TabsTrigger value="destiny" className="rounded-xl">
                        Destiny
                      </TabsTrigger>
                      <TabsTrigger value="soulUrge" className="rounded-xl">
                        Soul Urge
                      </TabsTrigger>
                      <TabsTrigger value="personality" className="rounded-xl">
                        Personality
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="lifePath">
                      <NumberCard
                        number={result.attitude.number}
                        title="Life Path"
                        description={result.attitude.meaning}
                        data={result.attitude.description}
                      />
                    </TabsContent>

                    <TabsContent value="destiny">
                      <NumberCard
                        number={result.destiny.number}
                        title="Destiny"
                        description={result.destiny.meaning}
                        data={result.destiny.description}
                      />
                    </TabsContent>

                    <TabsContent value="soulUrge">
                      <NumberCard
                        number={result.soul.number}
                        title="Soul Urge"
                        description={result.soul.meaning}
                        data={result.soul.description}
                        />
                    </TabsContent>

                    <TabsContent value="personality">
                      <NumberCard
                        number={result.personality.number}
                        title="Personality"
                        description={result.personality.meaning}
                        data={result.personality.description}
                        />
                    </TabsContent>

                    {/* <TabsContent value="character">
                      <NumberCard
                        number={result.character.number}
                        title="Character"
                        description={result.character.meaning}
                        data={result.character.description}
                        />
                    </TabsContent> */}
                  </Tabs>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-xl"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Report
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Placeholder when no result */
                <Card className="shadow-lg border-0 rounded-2xl h-full flex items-center justify-center">
                  <CardContent className="p-12 text-center">
                    <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Ready to Discover Your Numbers?
                    </h3>
                    <p className="text-gray-500">
                      Enter your name and birth date to calculate your numerology profile
                    </p>
                  </CardContent>
                </Card>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="shadow-lg border-0 rounded-2xl text-center p-6">
            <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Master Numbers</h3>
            <p className="text-gray-600 text-sm">
              11, 22, and 33 are master numbers with enhanced spiritual significance and challenges.
            </p>
          </Card>

          <Card className="shadow-lg border-0 rounded-2xl text-center p-6">
            <Target className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Life Purpose</h3>
            <p className="text-gray-600 text-sm">
              Your Life Path number reveals your natural talents and life's true purpose.
            </p>
          </Card>

          <Card className="shadow-lg border-0 rounded-2xl text-center p-6">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Relationship Insight</h3>
            <p className="text-gray-600 text-sm">
              Discover compatibility and understand relationship dynamics through numerology.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NumerologyCalculator;