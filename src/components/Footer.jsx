
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, LinkedinIcon, Home, Sparkles, Play, MessageCircle, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'
const Footer = () => {
  return (
    <>
      <footer className="hidden md:block bg-gray-900 text-white pt-16 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="w-100%">
            <div className="border-b border-gray-800 ">
              <h3 className="text-lg border-b-yellow-400 border-b-2 w-fit" >About Astrotruth</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Astrotruth is the best astrology website for online Astrology predictions. Talk to Astrologer on call and get answers to all your worries by seeing the future life through Astrology Kundli Predictions from the best Astrologers from India. Get best future predictions related to Marriage, love life, Career or Health over call, chat, query or report.
              </p>
            </div>

            <div className="flex justify-between my-4 gap-6">
              <div className="w-[40%]">
                <h3 className="text-lg border-b-yellow-400 border-b-2 w-fit" >Horoscope</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Today's Horoscope</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Today's Love Horoscope</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Yesterday's Horoscope</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Tomorrow's Horoscope</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Weekly Horoscope</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Monthly Horoscope</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Yearly Horoscope</Link></li>
                </ul>

                <h3 className="text-lg border-b-yellow-400 border-b-2 w-fit mt-4" >Shubh Muhurat 2025</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Annanprashan Muhurat 2025</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Naamkarn Muhurat 2025</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Car/Bike Muhurat 2025</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Marriage Muhurat 2025</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Gold Buying Muhurat 2025</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Bhoomi Pujan Muhurat 2025</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Griha Pravesh Muhurat 2025</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Mundan Muhurat 2025</Link></li>
                </ul>
              </div>

              <div className="w-[40%]">
                <h3 className="text-lg border-b-yellow-400 border-b-2 w-fit" >Important Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Astromall</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Astrotruth Store</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Today Panchang</Link></li>
                  <li><Link to="/astrologers" className="text-gray-400 hover:text-white transition-colors">Live Astrologers</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">How to read kundali</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Free Kundali</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Kundali Matching</Link></li>
                  <li><Link to="/astrologers" className="text-gray-400 hover:text-white transition-colors">Chat with Astrologer</Link></li>
                  <li><Link to="/astrologers" className="text-gray-400 hover:text-white transition-colors">Talk to Astrologer</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Astrotruth Reviews</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Astrology Yoga</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Kaalsarp Doshas</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Child Astrology</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Ascendant Sign Gemstone</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Nakshatras Constellations</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Numerology</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Mantras</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Astrological remedies for job</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Promotion</Link></li>

                </ul>
              </div>

              <div className="w-[40%]">
                <h3 className="text-lg border-b-yellow-400 border-b-2 w-fit" >Important Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Collaboration</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Tarot</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Zodiac Signs</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Vastu Shastra</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Love Calculator</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Guru Purnima 2025</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Astrotruth Sitemap</Link></li>
                </ul>

                <h3 className="text-lg border-b-yellow-400 border-b-2 w-fit mt-4" >Shop our products</h3>
                <ul className="space-y-2">
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Evil Eye</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Rudraksha</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Karungali</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Gemstones</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Pyrite</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Selenite</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Rudraksha Bracelet For Men</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Rudraksha Bracelet For Women</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Murtis and Idols</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Raw Pyrite Stone</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Money Magnet Bracelet</Link></li>
                  <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Khazani Ayurveda</Link></li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between my-4 gap-6">
              <div className="w-[40%]">
                <h3 className="text-lg border-b-yellow-400 border-b-2 w-fit" >Astrologer</h3>
                <ul className="space-y-2">
                  <li><Link to="/astro-login" className="text-gray-400 hover:text-white transition-colors">Astrologer Login</Link></li>
                  <li><Link to="/astro-register" className="text-gray-400 hover:text-white transition-colors">Astrologer Registration</Link></li>
                </ul>

                <h3 className="text-lg border-b-yellow-400 border-b-2 w-fit mt-4" >Corporate Info</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Refund & Cancellation Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                  <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
                  <li><Link to="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Pricing Policy</Link></li>
                </ul>
              </div>

              <div className="w-[40%]">
                <h3 className="text-lg border-b-yellow-400 border-b-2 w-fit" >contact us</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400 hover:text-white transition-colors">We are available 24x7 on chat support, click to start chat</li>
                  <li className="text-gray-400 hover:text-white transition-colors">Email ID: support@astrotruth.com</li>
                  <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                </ul>
              </div>

              <div className="w-[40%]">
                <h3 className="text-lg border-b-yellow-400 border-b-2 w-fit" >Secure</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Private & Confidential</Link></li>
                  <li><Link to="/astrologers" className="text-gray-400 hover:text-white transition-colors">Verified Astrologers</Link></li>
                  <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Secure Payments</Link></li>
                </ul>
              </div>
            </div>
          </div>





          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                  <LinkedinIcon className="h-5 w-5" />
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
          </div> */}

          {/* <div className="border-t border-gray-800 pt-8">
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
          </div> */}
        </div>
        <div className="w-full bg-black text-center">
            <p>
             Copyright © 2025 Astrotuth. All rights reserved.
            </p>
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
        <Link to="/astrologers" className="flex flex-col items-center text-gray-700">
          <Play className="h-6 w-6" />
          <span className="text-xs">Live</span>
        </Link>
        <Link to="/user-chats" className="flex flex-col items-center text-gray-700">
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs">Chat</span>
        </Link>
        <Link to="/store" className="flex flex-col items-center text-gray-700">
          <History className="h-6 w-6" />
          <span className="text-xs">History</span>
        </Link>
      </div>
    </>
  );
};

export default Footer;
