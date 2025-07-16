import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Phone, User, LogOut, ArrowBigDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // dropdown menu
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Astrologers", href: "/astrologers" },
    { name: "Services  ",
      icon: <ChevronDown className="ml-1 inline-block w-4 h-4" />,
      dropdown: [
      { name: "Store", href: "/store" },
      { name: "Karamkandi", href: "/karamkandi" },
      { name: "Horoscope", href: "/horoscope" },     
    ],
     },
     { name: "Matching ",
      icon: <ChevronDown className="ml-1 inline-block w-4 h-4" />,
      dropdown: [
      { name: "Dashakoot", href: "/dashakoot" },
      { name: "Ashtakoot", href: "/ashtakoot" },     
    ],
     },    
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <section className="topheader-width">
  <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 h-full">
          <Link to="/" className="flex items-center">
            <img src={logo} className=" w-auto h-[15rem]  " alt="Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-4">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div className="relative group" key={link.name}>
                <button className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {link.name}{link.icon}
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md py-2 mt-2 w-48 z-50">
                  {link.dropdown.map((sublink) => (
                    <Link
                      key={sublink.name}
                      to={sublink.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            )
          )}

          {/* Auth Buttons */}
          {user ? (
            <>
              <span className="text-sm text-gray-700">
                Welcome, {user.email.split("@")[0]}!
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/user-register">
                <Button className="cosmic-gradient text-white">
                  <User className="mr-2 h-4 w-4" /> User Register
                </Button>
              </Link>
              <Link to="/astro-register">
                <Button className="cosmic-gradient text-white">
                  <User className="mr-2 h-4 w-4" /> Astro Register
                </Button>
              </Link>
            </>
          )}

          {/* Talk to Astrologer Dialog */}
         
        </div>

        {/* Mobile Right Buttons */}
        <div className="xl:hidden flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-6">
              <div className="grid gap-4">
                <h3 className="text-lg font-medium">Talk to an Astrologer Now</h3>
                <p className="text-sm text-gray-500">
                  Enter your phone number and we'll connect you with an expert astrologer.
                </p>
                <Input placeholder="Enter your phone number" type="tel" />
                <Button className="cosmic-gradient text-white w-full">Connect Now</Button>
              </div>
            </DialogContent>
          </Dialog>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
          >
            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="xl:hidden bg-white shadow-lg px-4"
        >
          <div className="flex flex-col gap-2 py-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <details key={link.name} className="px-3 py-1">
                  <summary className="cursor-pointer text-gray-700 text-base font-medium hover:text-primary">
                    {link.name}
                  </summary>
                  <div className="ml-3 mt-2 space-y-1">
                    {link.dropdown.map((sublink) => (
                      <Link
                        key={sublink.name}
                        to={sublink.href}
                        className="block text-gray-600 hover:text-primary text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}

            {/* Auth Buttons */}
            {user ? (
              <>
                <span className="text-gray-700 block px-3 py-2 text-base">
                  Welcome, {user.email.split("@")[0]}!
                </span>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/user-login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-primary w-full justify-start"
                  >
                    User Login
                  </Button>
                </Link>
                <Link to="/user-register" onClick={() => setIsOpen(false)}>
                  <Button className="cosmic-gradient text-white w-full">
                    <User className="mr-2 h-4 w-4" /> User Register
                  </Button>
                </Link>
                <Link to="/astro-register" onClick={() => setIsOpen(false)}>
                  <Button className="cosmic-gradient text-white w-full">
                    <User className="mr-2 h-4 w-4" /> Astro Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
</section>

  );
};

export default Navbar;
