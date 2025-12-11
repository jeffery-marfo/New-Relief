

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Heart } from "lucide-react";
import loGo from '../assets/images/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial navbar animation
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Logo animation
      // gsap.from(logoRef.current, {
      //   scale: 0,
      //   rotation: -180,
      //   duration: 1,
      //   ease: "back.out(1.7)",
      //   delay: 0.3
      // });

      // Stagger nav links
      gsap.from(navLinksRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
      });

      // CTA button animation
      gsap.from(ctaRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
        delay: 1
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
    if (!menuOpen) {
      gsap.from(".mobile-menu-item", {
        x: -50,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  };

  const addToRefs = (el) => {
    if (el && !navLinksRef.current.includes(el)) {
      navLinksRef.current.push(el);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-xl shadow-lg py-2  border-gray-200/50" 
          : "bg-black/10 backdrop-blur-md py-4"
      }`}
      style={{
        boxShadow: scrolled ? "0 8px 32px 0 rgba(31, 38, 135, 0.15)" : "none"
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-2">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
            scrolled ? "bg-white" : "bg-white/90"
          } transition-all duration-300`}>
            <img 
              src={loGo}
              alt="New Relief International Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <a
            href="/"
            className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? "text-gray-800" : "text-white drop-shadow-lg"
            }`}
          >
            New Relief International
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <NavLink ref={addToRefs} href="/" label="Home" scrolled={scrolled} />
          {/* <NavLink ref={addToRefs} href="/about" label="About Us" scrolled={scrolled} /> */}
          <NavLink ref={addToRefs} href="/events" label="Events" scrolled={scrolled} />
          <NavLink ref={addToRefs} href="/messages" label="Messages" scrolled={scrolled} />
          {/* <NavLink ref={addToRefs} href="/live" label="Live" scrolled={scrolled} /> */}
          <NavLink ref={addToRefs} href="/donations" label="Donations" scrolled={scrolled} />
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="hidden md:flex items-center">
          <a
            href="/contact-us"
            className={`rounded-full px-6 py-2 font-medium transition-all duration-300 transform hover:scale-105 ${
              scrolled
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                : "bg-white/90 text-blue-800 hover:bg-white shadow-xl"
            }`}
          >
            Contact Us
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`${
              scrolled
                ? "text-gray-700 hover:text-gray-900"
                : "text-white drop-shadow-md hover:text-gray-200"
            } focus:outline-none transition-colors`}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-200/50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink href="/" label="Home" />
            {/* <MobileNavLink href="/about" label="About Us" /> */}
            <MobileNavLink href="/events" label="Events" />
            <MobileNavLink href="/messages" label="Messages" />
            {/* <MobileNavLink href="/live" label="Live" /> */}
            <MobileNavLink href="/donations" label="Donations" />
            <div className="pt-4 pb-2">
              <a
                href="/contact-us"
                className="mobile-menu-item block w-full text-center rounded-md px-3 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// NavLink Component with GSAP hover animation
const NavLink = React.forwardRef(({ href, label, scrolled }, ref) => {
  const linkRef = useRef(null);

  const handleHover = () => {
    gsap.to(linkRef.current, {
      y: -3,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleHoverExit = () => {
    gsap.to(linkRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <a
      ref={(el) => {
        linkRef.current = el;
        if (typeof ref === 'function') ref(el);
      }}
      href={href}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverExit}
      className={`font-medium tracking-wide transition-colors duration-300 ${
        scrolled
          ? "text-gray-700 hover:text-blue-600"
          : "text-white drop-shadow-md hover:text-blue-200"
      }`}
    >
      {label}
    </a>
  );
});

// Mobile NavLink Component
const MobileNavLink = ({ href, label }) => {
  return (
    <a
      href={href}
      className="mobile-menu-item block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
    >
      {label}
    </a>
  );
};

export default Navbar;