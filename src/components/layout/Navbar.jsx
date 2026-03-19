import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import MagneticButton from "../ui/MagneticButton";

import { config } from "../../data/config";

const defaultNavLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Resume", id: "resume" },
  { name: "Education", id: "education" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Certificates", id: "certificates" },
  { name: "Achievements", id: "achievements" },
  { name: "Training", id: "training" },
  { name: "Badges", id: "hackathon-badges" },
  { name: "Contact", id: "contact" },
];

const Navbar = ({ navLinks = defaultNavLinks }) => {
  const profileName = config.name;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Custom hook to detect active section based on scroll
  const activeSection = useScrollSpy(
    navLinks.map((link) => link.id),
    120,
  );

  // Calculate scroll progress 0-100
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Background flip
      setIsScrolled(window.scrollY > 50);

      // Progress calculation
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((window.scrollY / windowHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Extract initials for logo
  const initials = profileName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-auto ${
          isScrolled
            ? "py-4 bg-brand-base/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Magnet Logo */}
          <MagneticButton
            className="!px-0 !py-0 !bg-transparent group"
            onClick={() => handleScrollTo("home")}
            variant="ghost"
          >
            <div className="text-2xl font-display font-bold text-white relative flex items-center h-10 w-10 justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-indigo/50 transition-colors">
              <span className="text-brand-indigo group-hover:text-glow transition-all duration-300">
                {initials[0]}
              </span>
              <span>{initials.substring(1)}.</span>
              <motion.div className="absolute inset-0 rounded-xl bg-brand-indigo/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </MagneticButton>

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-8 items-center bg-white/[0.02] border border-white/5 px-8 py-3 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <div
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`relative text-sm font-sans font-medium transition-colors duration-300 pointer-events-auto ${
                  activeSection === link.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {/* Magnetic wrapper for individual links */}
                <div className="px-2 py-1 relative">
                  <span className="relative z-10">{link.name}</span>
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-1.5 h-1.5 rounded-full bg-brand-cyan box-glow"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block relative z-20">
            <MagneticButton
              onClick={() => handleScrollTo("contact")}
              variant="primary"
              className="py-2! px-5! text-sm"
            >
              Hire Me
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white relative z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div
          className={`absolute bottom-0 left-0 h-[1px] w-full transition-all duration-300 ${isScrolled ? "bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-indigo shadow-[0_0_20px_rgba(99,102,241,0.4)]" : "bg-white/5"}`}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-cyan"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] bg-brand-base/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center space-y-8"
          >
            {/* Ambient Background Glow for mobile menu */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-indigo/10 blur-[100px] rounded-full pointer-events-none" />

            {navLinks.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                onClick={() => handleScrollTo(link.id)}
                className={`text-3xl font-display font-medium relative ${
                  activeSection === link.id ? "text-white" : "text-gray-500"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-cyan box-glow"
                  />
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + navLinks.length * 0.05 }}
              className="pt-8"
            >
              <MagneticButton
                onClick={() => handleScrollTo("contact")}
                variant="primary"
              >
                Let's Talk
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
