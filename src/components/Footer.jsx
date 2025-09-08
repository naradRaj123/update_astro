
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, LinkedinIcon, Home, Sparkles, Play, MessageCircle, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'
const Footer = () => {
  return (
    <>
    <footer className="hidden md:block bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col items-start lg:items-start">
            <img
              src={logo}
              alt="AstroTruth Logo"
              className="w-36 h-auto object-contain mb-4"
            />
            <p className="text-gray-400 mb-4 leading-relaxed">
              Connecting you with expert astrologers for guidance on life's journey.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1EjUg7c5fc/" className="text-gray-400 hover:text-white transition-colors" target="_blank">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/astrotruth-a6a428372?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <LinkedinIcon className="h-5 w-5"  />
              </a>
              <a href="https://www.instagram.com/astr.otruth?igsh=MW9rNGV5dmwxMG9oOA==" className="text-gray-400 hover:text-white transition-colors" target="_blank">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/@astrotruthabc?si=cgJFqvA0PwZWmD7e" className="text-gray-400 hover:text-white transition-colors" target="_blank">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>


          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/astrologers" className="text-gray-400 hover:text-white transition-colors">Astrologers</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/kundalimatch" className="text-gray-400 hover:text-white transition-colors">Kundali Matching</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Horoscope</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Free Kundali</Link></li>            
            </ul>

          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <p className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span className="text-gray-400">SA.5/136, SANJAY NAGAR RAMAREY PUR, Varanasi Cantt, India</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <a href="tel:+919415695659">
                <span className="text-gray-400">+91 9415695659</span>
                </a>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">support@astrotruth.in</span>
              </p>
            </div>
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Subscribe to our newsletter</h5>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button className="ml-2 cosmic-gradient">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Astrotuth. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Refund Policy</Link>
            </div>

          </div>
        </div>
      </div>
    </footer>


    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow flex justify-around py-2">
        <Link to="/" className="flex flex-col items-center text-gray-700">
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/astrologers" className="flex flex-col items-center text-gray-700">
          <Sparkles className="h-6 w-6" />
          <span className="text-xs">Astro</span>
        </Link>
        <Link to="/live" className="flex flex-col items-center text-gray-700">
          <Play className="h-6 w-6" />
          <span className="text-xs">Live</span>
        </Link>
        <Link to="/chat" className="flex flex-col items-center text-gray-700">
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs">Chat</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center text-gray-700">
          <History className="h-6 w-6" />
          <span className="text-xs">History</span>
        </Link>
      </div>
    </>
  );
};

export default Footer;
