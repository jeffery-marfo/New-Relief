import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart
} from "lucide-react";

import loGo from '../assets/images/logo.png';

const Footer = () => {
  // Custom intersection observer hook
  const footerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const controls = useAnimation();

  // Create our own intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Start animations when footer comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Variants for container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Variants for individual items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  // Card hover animation
  const cardHoverAnimation = {
    rest: { scale: 1, transition: { duration: 0.2 } },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)",
      transition: { duration: 0.2 } 
    }
  };

  return (
    <motion.footer 
      className="relative bg-blue-100/80 backdrop-blur-lg text-white pt-12 pb-8 border-t border-blue-300/30"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      ref={footerRef}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800/80 to-blue-900/90 backdrop-blur-md z-0"></div>
      
      {/* Glassmorphism decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-12 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-12 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* About Section */}
          <motion.div 
            className="backdrop-blur-xl bg-blue-800/40 p-6 rounded-lg shadow-lg border border-blue-700/30"
            variants={itemVariants}
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverAnimation}
              className="h-full"
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div 
                  className="w-26 h-18 bg-white rounded-full flex items-center justify-center shadow-lg border border-blue-500/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img 
                    src={loGo}
                    alt="New Relief International Logo" 
                    className="w-12 h-12 object-contain"
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-white">
                  New Relief International
                </h3>
              </div>
              <p className="text-blue-100 mb-4">
                Reaching out to people with the Gospel and nurturing them into maturity in their 
                walk with Jesus Christ is the mission of the organization.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="bg-blue-800/70 backdrop-blur-sm hover:bg-blue-700 p-2 rounded-full transition-colors border border-blue-600/30 shadow-lg text-blue-200 hover:text-white"
                  whileHover={{ scale: 1.1, y: -5 }}
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-blue-800/70 backdrop-blur-sm hover:bg-blue-700 p-2 rounded-full transition-colors border border-blue-600/30 shadow-lg text-blue-200 hover:text-white"
                  whileHover={{ scale: 1.1, y: -5 }}
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-blue-800/70 backdrop-blur-sm hover:bg-blue-700 p-2 rounded-full transition-colors border border-blue-600/30 shadow-lg text-blue-200 hover:text-white"
                  whileHover={{ scale: 1.1, y: -5 }}
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="bg-blue-800/70 backdrop-blur-sm hover:bg-blue-700 p-2 rounded-full transition-colors border border-blue-600/30 shadow-lg text-blue-200 hover:text-white"
                  whileHover={{ scale: 1.1, y: -5 }}
                  aria-label="Youtube"
                >
                  <Youtube size={20} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="backdrop-blur-xl bg-blue-800/40 p-6 rounded-lg shadow-lg border border-blue-700/30"
            variants={itemVariants}
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverAnimation}
              className="h-full"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                {["About Us", "Sermon Archive", "Ministry Updates", "Community Outreach", "Prayer Requests", "Donate"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                  >
                    <motion.a
                      href="#"
                      className="text-blue-200 hover:text-white transition-colors flex items-center"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <motion.span 
                        className="mr-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      >
                        •
                      </motion.span>
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Service Times */}
          <motion.div 
            className="backdrop-blur-xl bg-blue-800/40 p-6 rounded-lg shadow-lg border border-blue-700/30"
            variants={itemVariants}
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverAnimation}
              className="h-full"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Service Times</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Clock size={16} className="mr-2 text-blue-300" />
                  <span className="text-blue-100">
                    Sunday Worship: 8:00 AM - 12:00 PM
                  </span>
                </li>
                <li className="flex items-center">
                  <Clock size={16} className="mr-2 text-blue-300" />
                  <span className="text-blue-100">
                    Bible Study: Wednesday 6:00 PM
                  </span>
                </li>
                <li className="flex items-center">
                  <Clock size={16} className="mr-2 text-blue-300" />
                  <span className="text-blue-100">
                    Prayer Meeting: Friday 7:00 PM
                  </span>
                </li>
                <li className="flex items-center">
                  <Calendar size={16} className="mr-2 text-blue-300" />
                  <span className="text-blue-100">
                    Youth Group: Saturday 4:00 PM
                  </span>
                </li>
                <li className="mt-4 text-blue-200">
                  <p>* Special services on holidays</p>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="backdrop-blur-xl bg-blue-800/40 p-6 rounded-lg shadow-lg border border-blue-700/30"
            variants={itemVariants}
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverAnimation}
              className="h-full"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-2 mt-1 text-blue-300" />
                  <span className="text-blue-100">
                    Yoomo Specs
                    <br />
                    Main Street, Accra
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-2 text-blue-300" />
                  <span className="text-blue-100">+233-55-806-8774</span>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-2 text-blue-300" />
                  <span className="text-blue-100">
                    info@newrelief.org
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div 
          className="border-t border-blue-700/30 my-8 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <motion.div 
            className="backdrop-blur-xl bg-blue-800/40 p-6 rounded-lg shadow-lg border border-blue-700/30"
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardHoverAnimation}
          >
            <div className="md:flex items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-8">
                <h4 className="text-lg font-bold mb-2 text-white">
                  Subscribe to Our Newsletter
                </h4>
                <p className="text-blue-100">
                  Stay updated with sermons, events, and prayer requests.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 bg-blue-700/60 backdrop-blur-sm text-white rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 sm:mb-0 border border-blue-600/30"
                />
                <motion.button 
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-r font-medium transition-colors text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div 
          className="border-t border-blue-700/30 pt-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-blue-200 mb-4 md:mb-0">
              © 2025 New Relief International. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="text-sm text-blue-200 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-blue-200 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-blue-200 hover:text-white transition-colors"
              >
                Accessibility
              </a>
              <a 
                href="#" 
                className="text-sm text-blue-200 hover:text-white transition-colors"
              >
                Site Map
              </a>
            </div>
          </div>
          <motion.div 
            className="mt-4 flex justify-center items-center text-blue-200 text-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop", 
                duration: 2
              }}
            >
              <Heart size={16} className="mx-1 text-red-400" />
            </motion.div>
            <span>in service to Christ</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;