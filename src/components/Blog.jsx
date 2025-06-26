
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    title: "Understanding Your Moon Sign and Its Impact on Emotions",
    excerpt: "Discover how your moon sign influences your emotional responses and inner self.",
    category: "Astrology Basics",
    date: "May 25, 2025",
  },
  {
    title: "Mercury Retrograde: Myths and Reality",
    excerpt: "Learn what Mercury retrograde really means and how to navigate this astrological period.",
    category: "Planetary Movements",
    date: "May 18, 2025",
  },
  {
    title: "Compatibility Beyond Sun Signs: The Full Astrological Picture",
    excerpt: "Why sun sign compatibility is just the beginning of understanding relationship dynamics.",
    category: "Relationships",
    date: "May 10, 2025",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-16 bg-gray-50 common-margin-top">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest from our <span className="cosmic-text">Blog</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, guides, and astrological wisdom to enhance your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img  alt={post.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1685478237361-a5b50d0eb76b" />
                <div className="absolute top-3 left-3">
                  <Badge variant="cosmic">{post.category}</Badge>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button size="lg" className="cosmic-gradient">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
