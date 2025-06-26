import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, Send, User, Calendar, Clock } from 'lucide-react';

const AskQuestionPage = () => {
  const [isFreeQuestionUsed, setIsFreeQuestionUsed] = React.useState(false); // Mock state

  return (
    <div className="min-h-screen p-4 md:p-8 bg-yellow-50">
      <motion.div
        className="container mx-auto max-w-2xl"
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
              <HelpCircle className="h-16 w-16 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800">Ask a Question</CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-2">
              Get answers to your pressing questions from our expert astrologers.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6 bg-white">
            {!isFreeQuestionUsed && (
              <motion.div 
                className="p-4 bg-green-100 border-l-4 border-green-500 rounded-md text-green-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-semibold">🎉 Your First Question is FREE! 🎉</h3>
                <p className="text-sm">Ask any one question and get a personalized answer from an astrologer at no cost.</p>
              </motion.div>
            )}

            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center"><User className="mr-2 h-4 w-4 text-yellow-500" />Full Name</Label>
                <Input id="name" placeholder="Your Full Name" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dob" className="text-sm font-medium text-gray-700 flex items-center"><Calendar className="mr-2 h-4 w-4 text-yellow-500" />Date of Birth</Label>
                  <Input id="dob" type="date" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
                <div>
                  <Label htmlFor="tob" className="text-sm font-medium text-gray-700 flex items-center"><Clock className="mr-2 h-4 w-4 text-yellow-500" />Time of Birth</Label>
                  <Input id="tob" type="time" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
              </div>

              <div>
                <Label htmlFor="birthPlace" className="text-sm font-medium text-gray-700">Place of Birth</Label>
                <Input id="birthPlace" placeholder="City, Country" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>

              <div>
                <Label htmlFor="questionCategory" className="text-sm font-medium text-gray-700">Question Category</Label>
                {/* Replace with Select component */}
                <Input id="questionCategory" placeholder="e.g., Career, Love, Health" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>

              <div>
                <Label htmlFor="question" className="text-sm font-medium text-gray-700">Your Question</Label>
                <Textarea id="question" placeholder="Type your question here..." rows={5} className="mt-1 focus:ring-yellow-500 focus:border-yellow-500" />
                <p className="text-xs text-gray-500 mt-1">Be specific for a better answer. Max 500 characters.</p>
              </div>
              
              <Button type="submit" className="w-full btn-primary-theme text-gray-800 font-semibold text-lg py-3">
                <Send className="mr-2 h-5 w-5" /> Submit Your Question
              </Button>
            </form>
          </CardContent>
          <CardFooter className="p-6 bg-yellow-50 border-t border-yellow-200">
            <p className="text-xs text-gray-600 text-center w-full">
              Answers are typically provided within 24-48 hours. You will be notified via email and in your dashboard. For urgent queries, consider a live consultation.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AskQuestionPage;