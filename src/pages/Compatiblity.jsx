
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  Calculator,
  Star,
  Zap,
  Target,
  Crown,
  Share2,
  Download,
  RefreshCw,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const Compatibility = () => {
  const [activeTab, setActiveTab] = useState("love");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [birthDate1, setBirthDate1] = useState("");
  const [birthDate2, setBirthDate2] = useState("");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [history, setHistory] = useState([]);

  // Zodiac signs
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  // Compatibility data for different types
  const compatibilityData = {
    love: {
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
      0: {
        title: "Difficult Match 🫤",
        message: "Significant differences that require strong commitment.",
        color: "from-gray-500 to-gray-700"
      }
    },
    friendship: {
      90: {
        title: "Best Friends Forever! 🤝",
        message: "An incredible friendship that will stand the test of time!",
        color: "from-blue-500 to-cyan-500"
      },
      80: {
        title: "Amazing Friends! 🌈",
        message: "Great friendship with strong understanding and support.",
        color: "from-green-500 to-blue-500"
      },
      70: {
        title: "Good Friends! 👍",
        message: "Solid friendship with good potential for growth.",
        color: "from-teal-500 to-green-500"
      },
      60: {
        title: "Friendly Connection 😊",
        message: "Nice friendship that can develop with shared interests.",
        color: "from-yellow-500 to-green-500"
      },
      50: {
        title: "Casual Friends 👋",
        message: "Friendly but may not develop into deep friendship.",
        color: "from-orange-500 to-yellow-500"
      },
      0: {
        title: "Different Vibes 🎭",
        message: "You might not connect deeply as friends.",
        color: "from-gray-500 to-gray-700"
      }
    },
    career: {
      90: {
        title: "Dream Team! 🚀",
        message: "Exceptional professional synergy and collaboration!",
        color: "from-purple-500 to-indigo-500"
      },
      80: {
        title: "Great Partners! 💼",
        message: "Strong professional compatibility and mutual respect.",
        color: "from-blue-500 to-purple-500"
      },
      70: {
        title: "Good Colleagues! 👔",
        message: "Positive working relationship with good cooperation.",
        color: "from-cyan-500 to-blue-500"
      },
      60: {
        title: "Professional Match 📊",
        message: "Decent working relationship with some synergy.",
        color: "from-green-500 to-cyan-500"
      },
      50: {
        title: "Average Compatibility 📈",
        message: "Standard professional relationship.",
        color: "from-yellow-500 to-green-500"
      },
      0: {
        title: "Different Styles 🎯",
        message: "Professional approaches may not align well.",
        color: "from-gray-500 to-gray-700"
      }
    },
    business: {
      90: {
        title: "Power Partnership! 💰",
        message: "Exceptional business synergy and financial potential!",
        color: "from-green-500 to-emerald-500"
      },
      80: {
        title: "Strong Partners! 📈",
        message: "Great business compatibility with good growth potential.",
        color: "from-emerald-500 to-green-500"
      },
      70: {
        title: "Good Business Match 💵",
        message: "Solid partnership with reasonable success potential.",
        color: "from-lime-500 to-emerald-500"
      },
      60: {
        title: "Moderate Potential 📊",
        message: "Reasonable business compatibility with some challenges.",
        color: "from-yellow-500 to-lime-500"
      },
      50: {
        title: "Average Business 👔",
        message: "Standard business relationship.",
        color: "from-orange-500 to-yellow-500"
      },
      0: {
        title: "Risky Partnership ⚠️",
        message: "Business compatibility may face significant challenges.",
        color: "from-red-500 to-orange-500"
      }
    }
  };

  // Calculate compatibility score (deterministic based on names)
  const calculateCompatibility = (name1, name2, type) => {
    const combined = (name1 + name2).toLowerCase();
    let hash = 0;
    
    for (let i = 0; i < combined.length; i++) {
      hash = ((hash << 5) - hash) + combined.charCodeAt(i);
      hash |= 0;
    }
    
    let score = Math.abs(hash) % 101;
    
    // Adjust based on relationship type
    if (type === 'love') {
      if (score < 30) score += 20;
      else if (score > 80) score -= 10;
    } else if (type === 'friendship') {
      if (score < 25) score += 25;
    } else if (type === 'business') {
      if (score > 85) score -= 15;
    }
    
    return Math.min(100, Math.max(10, score));
  };

  // Generate random zodiac sign
  const getRandomZodiac = () => {
    return zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
  };

  // Generate relationship insights based on type and score
  const generateInsights = (score, type) => {
    const insights = {
      love: {
        strengths: [
          "Emotional Connection", "Trust & Loyalty", "Physical Chemistry",
          "Communication", "Shared Values", "Romantic Compatibility"
        ],
        challenges: [
          "Different Love Languages", "Communication Styles", "Future Goals",
          "Conflict Resolution", "Personal Space", "Family Expectations"
        ],
        advice: [
          "Practice active listening and express your feelings openly",
          "Schedule regular date nights to maintain romance",
          "Learn each other's love languages and act accordingly",
          "Respect each other's individuality and personal growth",
          "Work on building trust through consistency and honesty"
        ]
      },
      friendship: {
        strengths: [
          "Trust & Reliability", "Shared Interests", "Emotional Support",
          "Communication", "Fun & Adventure", "Mutual Respect"
        ],
        challenges: [
          "Different Social Needs", "Communication Gaps", "Time Management",
          "Conflict Handling", "Life Priorities", "Personal Boundaries"
        ],
        advice: [
          "Make time for regular catch-ups and shared activities",
          "Be honest and open in your communication",
          "Respect each other's boundaries and personal space",
          "Support each other's growth and celebrate successes",
          "Handle conflicts with understanding and patience"
        ]
      },
      career: {
        strengths: [
          "Skill Complementarity", "Work Ethic", "Communication",
          "Problem Solving", "Teamwork", "Professional Respect"
        ],
        challenges: [
          "Work Style Differences", "Communication Gaps", "Goal Alignment",
          "Stress Management", "Decision Making", "Work-Life Balance"
        ],
        advice: [
          "Establish clear communication channels and expectations",
          "Leverage each other's strengths in projects",
          "Respect different working styles and find common ground",
          "Provide constructive feedback and appreciate contributions",
          "Maintain professional boundaries while being supportive"
        ]
      },
      business: {
        strengths: [
          "Strategic Alignment", "Financial Acumen", "Risk Management",
          "Innovation", "Networking", "Decision Making"
        ],
        challenges: [
          "Financial Management", "Strategic Differences", "Risk Tolerance",
          "Work Distribution", "Growth Vision", "Conflict Resolution"
        ],
        advice: [
          "Create clear partnership agreements and responsibilities",
          "Align on long-term business goals and vision",
          "Establish transparent financial management systems",
          "Leverage each other's networks and expertise",
          "Maintain open communication about challenges and successes"
        ]
      }
    };

    const typeData = insights[type];
    const numStrengths = Math.min(3 + Math.floor(score / 25), 4);
    const numChallenges = Math.min(3 - Math.floor(score / 35), 2);

    const shuffledStrengths = [...typeData.strengths].sort(() => 0.5 - Math.random());
    const shuffledChallenges = [...typeData.challenges].sort(() => 0.5 - Math.random());
    const shuffledAdvice = [...typeData.advice].sort(() => 0.5 - Math.random());

    return {
      zodiac1: getRandomZodiac(),
      zodiac2: getRandomZodiac(),
      strengths: shuffledStrengths.slice(0, numStrengths),
      challenges: shuffledChallenges.slice(0, numChallenges),
      advice: shuffledAdvice.slice(0, 3)
    };
  };

  const handleCalculate = () => {
    if (!name1.trim() || !name2.trim()) {
      alert("Please enter both names!");
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const score = calculateCompatibility(name1, name2, activeTab);
      const insights = generateInsights(score, activeTab);
      
      const newResult = {
        score,
        name1: name1.trim(),
        name2: name2.trim(),
        type: activeTab,
        ...insights,
        timestamp: new Date().toLocaleString()
      };
      
      setResult(newResult);
      setHistory(prev => [newResult, ...prev.slice(0, 4)]);
      setIsCalculating(false);
    }, 2000);
  };

  const handleRandomGenerate = () => {
    const randomNames = {
      love: [
        ["Priya", "Raj"], ["Anjali", "Amit"], ["Sonia", "Rahul"]
      ],
      friendship: [
        ["Rohit", "Kunal"], ["Neha", "Pooja"], ["Vikram", "Sanjay"]
      ],
      career: [
        ["Deepak", "Meera"], ["Arjun", "Sunita"], ["Kavita", "Ramesh"]
      ],
      business: [
        ["Anil", "Sunil"], ["Rajesh", "Manoj"], ["Suresh", "Vishal"]
      ]
    };
    
    const names = randomNames[activeTab] || randomNames.love;
    const [randomName1, randomName2] = names[Math.floor(Math.random() * names.length)];
    setName1(randomName1);
    setName2(randomName2);
  };

  const getCompatibilityMessage = (score, type) => {
    const typeData = compatibilityData[type];
    if (score >= 90) return typeData[90];
    if (score >= 80) return typeData[80];
    if (score >= 70) return typeData[70];
    if (score >= 60) return typeData[60];
    if (score >= 50) return typeData[50];
    return typeData[0];
  };

  const CompatibilityMeter = ({ score, type }) => {
    const message = getCompatibilityMessage(score, type);
    
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

  const getTypeIcon = (type) => {
    const icons = {
      love: Heart,
      friendship: Users,
      career: Briefcase,
      business: TrendingUp
    };
    return icons[type] || Heart;
  };

  const getTypeColor = (type) => {
    const colors = {
      love: "from-pink-500 to-red-500",
      friendship: "from-blue-500 to-cyan-500",
      career: "from-purple-500 to-indigo-500",
      business: "from-green-500 to-emerald-500"
    };
    return colors[type] || "from-gray-500 to-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200 text-sm font-medium">
            <Sparkles className="h-3 w-3 mr-1" />
            Cosmic Compatibility Calculator
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Your <span className="text-purple-600">Compatibility</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore different types of relationships and understand your cosmic connections with others
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 rounded-2xl">
              <CardHeader className={cn("text-white rounded-t-2xl", `bg-gradient-to-r ${getTypeColor(activeTab)}`)}>
                <CardTitle className="flex items-center justify-center space-x-2">
                  {React.createElement(getTypeIcon(activeTab), { className: "h-6 w-6" })}
                  <span className="capitalize">{activeTab} Compatibility</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Relationship Type Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
                    <TabsTrigger value="love" className="rounded-lg text-xs">
                      <Heart className="h-3 w-3 mr-1" />
                      Love
                    </TabsTrigger>
                    <TabsTrigger value="friendship" className="rounded-lg text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      Friends
                    </TabsTrigger>
                    <TabsTrigger value="career" className="rounded-lg text-xs">
                      <Briefcase className="h-3 w-3 mr-1" />
                      Career
                    </TabsTrigger>
                    <TabsTrigger value="business" className="rounded-lg text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Business
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Person</label>
                  <Input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Enter first name"
                    className="rounded-xl border-gray-300 focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center justify-center">
                  {React.createElement(getTypeIcon(activeTab), { 
                    className: "h-8 w-8 text-purple-500",
                    fill: activeTab === 'love' ? "currentColor" : "none"
                  })}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Second Person</label>
                  <Input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Enter second name"
                    className="rounded-xl border-gray-300 focus:border-purple-500"
                  />
                </div>

                <div className="flex flex-col space-y-3 pt-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className={cn(
                      "w-full text-white rounded-xl shadow-lg",
                      `bg-gradient-to-r ${getTypeColor(activeTab)} hover:opacity-90`
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
                        Calculate Compatibility
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleRandomGenerate}
                    variant="outline"
                    className="w-full rounded-xl border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate Random
                  </Button>
                </div>

                {/* Recent History */}
                {history.length > 0 && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-500" />
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
                            setActiveTab(item.type);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            {React.createElement(getTypeIcon(item.type), { 
                              className: "h-4 w-4 text-purple-500",
                              fill: item.type === 'love' ? "currentColor" : "none"
                            })}
                            <span className="font-medium text-sm">
                              {item.name1} & {item.name2}
                            </span>
                          </div>
                          <Badge className={cn("bg-gradient-to-r text-white", getTypeColor(item.type))}>
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
          <div className="lg:col-span-3">
            <AnimatePresence>
              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  {/* Main Result */}
                  <CompatibilityMeter score={result.score} type={result.type} />

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
                            <div className="text-sm text-gray-600">{result.name1}'s Sign</div>
                            <div className="font-bold text-lg text-blue-600">{result.zodiac1}</div>
                          </div>
                          {React.createElement(getTypeIcon(result.type), { 
                            className: "h-6 w-6 text-purple-500",
                            fill: result.type === 'love' ? "currentColor" : "none"
                          })}
                          <div className="text-center">
                            <div className="text-sm text-gray-600">{result.name2}'s Sign</div>
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
                          <span>Compatibility Analysis</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Overall Score</span>
                            <Badge variant="outline" className={cn("bg-gradient-to-r text-white", getTypeColor(result.type))}>
                              {result.score}%
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Relationship Type</span>
                            <span className="text-sm font-medium capitalize text-purple-600">{result.type}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Potential</span>
                            <span className="text-xs font-medium text-green-600">
                              {result.score >= 80 ? "Excellent" : result.score >= 60 ? "Good" : "Moderate"}
                            </span>
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
                          <span>Key Strengths</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          {result.strengths.map((strength, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{strength}</span>
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
                        <div className="space-y-3">
                          {result.challenges.map((challenge, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Advice */}
                  <Card className="shadow-lg border-0 rounded-2xl">
                    <CardHeader className={cn("text-white rounded-t-2xl", `bg-gradient-to-r ${getTypeColor(result.type)}`)}>
                      <CardTitle className="flex items-center justify-center space-x-2 text-lg">
                        <Sparkles className="h-5 w-5" />
                        <span>Relationship Advice</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {result.advice.map((tip, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 text-sm font-bold">{index + 1}</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Result
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Save Report
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Placeholder when no result */
                <Card className="shadow-lg border-0 rounded-2xl h-full flex items-center justify-center">
                  <CardContent className="p-12 text-center">
                    {React.createElement(getTypeIcon(activeTab), { 
                      className: "h-16 w-16 text-gray-300 mx-auto mb-4",
                      fill: activeTab === 'love' ? "currentColor" : "none"
                    })}
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Ready to Discover Your {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Compatibility?
                    </h3>
                    <p className="text-gray-500">
                      Enter names above to calculate your cosmic connection
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
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="shadow-lg border-0 rounded-2xl text-center p-6 group hover:scale-105 transition-transform duration-300">
            <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4 group-hover:scale-110 transition-transform" fill="currentColor" />
            <h3 className="font-bold text-gray-800 mb-2">Love Compatibility</h3>
            <p className="text-gray-600 text-sm">
              Discover romantic potential and relationship harmony with your partner
            </p>
          </Card>

          <Card className="shadow-lg border-0 rounded-2xl text-center p-6 group hover:scale-105 transition-transform duration-300">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-gray-800 mb-2">Friendship Match</h3>
            <p className="text-gray-600 text-sm">
              Understand friendship dynamics and long-term bonding potential
            </p>
          </Card>

          <Card className="shadow-lg border-0 rounded-2xl text-center p-6 group hover:scale-105 transition-transform duration-300">
            <Briefcase className="h-12 w-12 text-purple-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-gray-800 mb-2">Career Synergy</h3>
            <p className="text-gray-600 text-sm">
              Analyze professional compatibility and workplace harmony
            </p>
          </Card>

          <Card className="shadow-lg border-0 rounded-2xl text-center p-6 group hover:scale-105 transition-transform duration-300">
            <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-gray-800 mb-2">Business Partnership</h3>
            <p className="text-gray-600 text-sm">
              Evaluate business compatibility and entrepreneurial success potential
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Compatibility;