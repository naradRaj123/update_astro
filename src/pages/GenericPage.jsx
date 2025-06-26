import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const GenericPage = ({ title = "Page Under Construction" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-yellow-50">
      <motion.div
        className="container mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-yellow-400">
          <CardHeader className="p-8 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
            >
              <Info className="h-16 w-16 text-yellow-600" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-gray-800">{title}</CardTitle>
            {title === "Page Under Construction" && (
                <CardDescription className="text-lg text-gray-700 mt-2">
                We're working hard to bring you this feature. Please check back soon!
                </CardDescription>
            )}
             {title === "Page Not Found" && (
                <CardDescription className="text-lg text-gray-700 mt-2">
                Oops! The page you are looking for does not exist or has been moved.
                </CardDescription>
            )}
          </CardHeader>
          <CardContent className="p-6 md:p-10 bg-white">
            <p className="text-gray-600 mb-8">
              In the meantime, you can explore other parts of our website.
            </p>
            <Link to="/">
              <Button className="btn-primary-theme text-gray-800 font-semibold text-lg py-3 px-6">
                Go to Homepage
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default GenericPage;