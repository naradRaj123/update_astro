
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Sparkles, 
  Calculator, 
  RefreshCw, 
  Share2, 
  Download,
  Star,
  Calendar,
  Zap,
  Target,
  Crown,
  Flame
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const LoveCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [history, setHistory] = useState([]);

  // Zodiac signs for random generation
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  // Compatibility messages based on percentage
  const compatibilityMessages = {
    90: {
      title: "Soulmate Connection! 💫",
      message: "This is a rare and beautiful connection. You two are meant to be together!",
      color: "from-pink-500 to-red-500"
    },
    80: {
      title: "Perfect Match! 🌟",
      message: "Amazing compatibility! You complement each other perfectly.",
      color: "from-purple-500 to-pink-500"
    },
    70: {
      title: "Great Potential! 💖",
      message: "Strong connection with great potential for a lasting relationship.",
      color: "from-blue-500 to-purple-500"
    },
    60: {
      title: "Good Match! ❤️",
      message: "Good compatibility with room for growth and understanding.",
      color: "from-green-500 to-blue-500"
    },
    50: {
      title: "Average Compatibility 💝",
      message: "A balanced relationship that requires effort from both sides.",
      color: "from-yellow-500 to-orange-500"
    },
    40: {
      title: "Needs Work 💔",
      message: "Challenges ahead, but with communication, it can work.",
      color: "from-orange-500 to-red-500"
    },
    30: {
      title: "Difficult Match 🫤",
      message: "Significant differences that require strong commitment.",
      color: "from-red-400 to-orange-400"
    },
    0: {
      title: "Not Compatible 😢",
      message: "Major differences that might be hard to overcome.",
      color: "from-gray-500 to-gray-700"
    }
  };

  // Generate random compatibility score (deterministic based on names)
  const calculateCompatibility = (name1, name2) => {
    // Simple deterministic algorithm based on names
    const combined = (name1 + name2).toLowerCase();
    let hash = 0;
    
    for (let i = 0; i < combined.length; i++) {
      hash = ((hash << 5) - hash) + combined.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    
    // Ensure positive number and scale to 0-100
    const score = Math.abs(hash) % 101;
    
    // Adjust distribution to make extreme scores less common
    let adjustedScore;
    if (score < 20) adjustedScore = score + 20;
    else if (score > 80) adjustedScore = score - 15;
    else if (score < 30) adjustedScore = score + 10;
    else if (score > 70) adjustedScore = score - 5;
    else adjustedScore = score;
    
    return Math.min(100, Math.max(10, adjustedScore));
  };

  // Generate random zodiac sign
  const getRandomZodiac = () => {
    return zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
  };

  // Generate random relationship data
  const generateRelationshipData = (score) => {
    const strengths = [
      "Communication", "Trust", "Intimacy", "Understanding", "Adventure",
      "Emotional Connection", "Shared Values", "Physical Chemistry", "Mental Connection"
    ];
    
    const challenges = [
      "Different Communication Styles", "Trust Issues", "Different Life Goals",
      "Emotional Distance", "Financial Differences", "Family Expectations",
      "Personal Space Needs", "Conflict Resolution"
    ];

    const advice = [
      "Practice active listening and empathy in your conversations.",
      "Schedule regular date nights to keep the spark alive.",
      "Be open about your feelings and expectations.",
      "Respect each other's individuality and personal space.",
      "Work on building trust through consistency and honesty.",
      "Find common hobbies and interests to bond over.",
      "Learn each other's love languages and act accordingly.",
      "Don't avoid conflicts, but handle them with care and respect."
    ];

    // Randomly select strengths and challenges based on score
    const numStrengths = Math.min(3 + Math.floor(score / 25), 5);
    const numChallenges = Math.min(3 - Math.floor(score / 35), 3);

    const shuffledStrengths = [...strengths].sort(() => 0.5 - Math.random());
    const shuffledChallenges = [...challenges].sort(() => 0.5 - Math.random());
    const shuffledAdvice = [...advice].sort(() => 0.5 - Math.random());

    return {
      zodiac1: getRandomZodiac(),
      zodiac2: getRandomZodiac(),
      strengths: shuffledStrengths.slice(0, numStrengths),
      challenges: shuffledChallenges.slice(0, numChallenges),
      advice: shuffledAdvice.slice(0, 3),
      relationshipAge: Math.floor(Math.random() * 60) + 1, // 1-60 months
      nextMilestone: `Reach ${score + 5}% compatibility in ${Math.floor(Math.random() * 12) + 1} months`
    };
  };

  const handleCalculate = () => {
    if (!name1.trim() || !name2.trim()) {
      alert("Please enter both names!");
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const score = calculateCompatibility(name1, name2);
      const relationshipData = generateRelationshipData(score);
      
      const newResult = {
        score,
        name1: name1.trim(),
        name2: name2.trim(),
        ...relationshipData,
        timestamp: new Date().toLocaleDateString()
      };
      
      setResult(newResult);
      setHistory(prev => [newResult, ...prev.slice(0, 4)]); // Keep last 5
      setIsCalculating(false);
    }, 2000);
  };

  const handleRandomGenerate = () => {
    const randomNames = [
      ["Priya", "Raj"], ["Anjali", "Amit"], ["Sonia", "Rahul"], 
      ["Maya", "Arjun"], ["Neha", "Vikram"], ["Kavita", "Sanjay"],
      ["Divya", "Rohit"], ["Pooja", "Kunal"], ["Sunita", "Vishal"]
    ];
    
    const [randomName1, randomName2] = randomNames[Math.floor(Math.random() * randomNames.length)];
    setName1(randomName1);
    setName2(randomName2);
  };

  const handleShare = () => {
    if (!result) return;
    
    const text = `💖 Love Compatibility Result 💖\n\n${result.name1} ❤️ ${result.name2}\nCompatibility Score: ${result.score}%\n\nCheck out your love compatibility on AstroPro!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Love Compatibility Result',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Result copied to clipboard! 📋");
    }
  };

  const getCompatibilityMessage = (score) => {
    if (score >= 90) return compatibilityMessages[90];
    if (score >= 80) return compatibilityMessages[80];
    if (score >= 70) return compatibilityMessages[70];
    if (score >= 60) return compatibilityMessages[60];
    if (score >= 50) return compatibilityMessages[50];
    if (score >= 40) return compatibilityMessages[40];
    if (score >= 30) return compatibilityMessages[30];
    return compatibilityMessages[0];
  };

  const CompatibilityMeter = ({ score }) => {
    const message = getCompatibilityMessage(score);
    
    return (
      <div className="text-center space-y-4">
        <div className={cn(
          "bg-gradient-to-r text-white p-8 rounded-2xl shadow-lg",
          message.color
        )}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-6xl font-bold mb-2"
          >
            {score}%
          </motion.div>
          <div className="text-2xl font-bold mb-2">{message.title}</div>
          <div className="text-lg opacity-90">{message.message}</div>
        </div>
        
        {/* <Progress value={score} className="h-3 bg-gray-200" /> */}
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
          <span>Perfect</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-pink-100 text-pink-800 hover:bg-pink-200 text-sm font-medium">
            <Sparkles className="h-3 w-3 mr-1" />
            Cosmic Love Calculator
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find Your <span className="text-pink-600">Love Compatibility</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the cosmic connection between you and your partner with our advanced love calculator
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Heart className="h-6 w-6" fill="currentColor" />
                  <span>Enter Names</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Name</label>
                  <Input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Enter first name"
                    className="rounded-xl border-gray-300 focus:border-pink-500"
                  />
                </div>
                
                <div className="flex items-center justify-center">
                  <Heart className="h-8 w-8 text-pink-500" fill="currentColor" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Partner's Name</label>
                  <Input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Enter second name"
                    className="rounded-xl border-gray-300 focus:border-pink-500"
                  />
                </div>

                <div className="flex flex-col space-y-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className={cn(
                      "w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl shadow-lg",
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
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Love
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleRandomGenerate}
                    variant="outline"
                    className="w-full rounded-xl border-pink-200 text-pink-600 hover:bg-pink-50"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate Random
                  </Button>
                </div>

                {/* Recent History */}
                {history.length > 0 && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                      Recent Calculations
                    </h3>
                    <div className="space-y-2">
                      {history.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setName1(item.name1);
                            setName2(item.name2);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <Heart className="h-4 w-4 text-pink-500" fill="currentColor" />
                            <span className="font-medium text-sm">
                              {item.name1} & {item.name2}
                            </span>
                          </div>
                          <Badge className="bg-pink-100 text-pink-800">
                            {item.score}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  {/* Main Result */}
                  <CompatibilityMeter score={result.score} />

                  {/* Relationship Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Zodiac Compatibility */}
                    <Card className="shadow-lg border-0 rounded-2xl">
                      <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-2xl">
                        <CardTitle className="flex items-center justify-center space-x-2 text-lg">
                          <Sparkles className="h-5 w-5" />
                          <span>Zodiac Match</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Your Sign</div>
                            <div className="font-bold text-lg text-blue-600">{result.zodiac1}</div>
                          </div>
                          <Heart className="h-6 w-6 text-pink-500" fill="currentColor" />
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Partner's Sign</div>
                            <div className="font-bold text-lg text-purple-600">{result.zodiac2}</div>
                          </div>
                        </div>
                        <div className="text-center text-sm text-gray-600">
                          Cosmic alignment suggests {result.score >= 60 ? "strong" : "moderate"} zodiac compatibility
                        </div>
                      </CardContent>
                    </Card>

                    {/* Relationship Stats */}
                    <Card className="shadow-lg border-0 rounded-2xl">
                      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-2xl">
                        <CardTitle className="flex items-center justify-center space-x-2 text-lg">
                          <Target className="h-5 w-5" />
                          <span>Relationship Stats</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Relationship Age</span>
                            <Badge variant="outline">{result.relationshipAge} months</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Next Milestone</span>
                            <span className="text-xs text-pink-600 font-medium">{result.nextMilestone}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Strengths & Challenges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <Card className="shadow-lg border-0 rounded-2xl">
                      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-2xl">
                        <CardTitle className="flex items-center justify-center space-x-2 text-lg">
                          <Crown className="h-5 w-5" />
                          <span>Your Strengths</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          {result.strengths.map((strength, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Star className="h-4 w-4 text-green-500 fill-current" />
                              <span className="text-sm">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Challenges */}
                    <Card className="shadow-lg border-0 rounded-2xl">
                      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-2xl">
                        <CardTitle className="flex items-center justify-center space-x-2 text-lg">
                          <Zap className="h-5 w-5" />
                          <span>Areas to Improve</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          {result.challenges.map((challenge, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Flame className="h-4 w-4 text-orange-500" />
                              <span className="text-sm">{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Advice */}
                  <Card className="shadow-lg border-0 rounded-2xl">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl">
                      <CardTitle className="flex items-center justify-center space-x-2 text-lg">
                        <Sparkles className="h-5 w-5" />
                        <span>Relationship Advice</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        {result.advice.map((tip, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                              <span className="text-pink-600 text-sm font-bold">{index + 1}</span>
                            </div>
                            <p className="text-sm text-gray-700">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleShare}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Result
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl border-pink-200 text-pink-600 hover:bg-pink-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Save as PDF
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Placeholder when no result */
                <Card className="shadow-lg border-0 rounded-2xl h-full flex items-center justify-center">
                  <CardContent className="p-12 text-center">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Ready to Discover Your Love Compatibility?
                    </h3>
                    <p className="text-gray-500">
                      Enter your names above to calculate your cosmic connection
                    </p>
                  </CardContent>
                </Card>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveCalculator;






