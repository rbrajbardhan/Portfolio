import { useState, useEffect } from "react";
import { config } from "../../data/config";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const Footer = () => {
  const [keys, setKeys] = useState([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prev) => {
        const newKeys = [...prev, e.key];
        // Keep only the last N keys
        if (newKeys.length > konamiCode.length) {
          newKeys.shift();
        }

        // Check match
        if (newKeys.join(",") === konamiCode.join(",")) {
          toast("🎮 Konami Code Activated!", {
            description:
              "You found the secret easter egg. You must be a true geek!",
            icon: "👾",
            duration: 8000,
          });
          // Could add more wild effects here, like rotating the screen 180deg
          document.body.style.animation = "spin 2s linear";
          setTimeout(() => (document.body.style.animation = ""), 2000);
          return []; // Reset after success
        }

        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <footer className="relative bg-brand-base text-center py-12 px-6 border-t border-white/5 mt-20 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
        {/* Social Links with Enhanced Hover Effects */}
        <div className="flex gap-8">
          <motion.a
            href={config.social.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="group text-gray-400 hover:text-white transition-colors pointer-events-auto"
          >
            <div className="relative">
              <Github size={24} />
              <div className="absolute -inset-2 bg-white/0 group-hover:bg-white/10 rounded-full blur-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 -z-10" />
            </div>
          </motion.a>

          <motion.a
            href={config.social.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="group text-gray-400 hover:text-brand-cyan transition-colors pointer-events-auto"
          >
            <div className="relative">
              <Linkedin size={24} />
              <div className="absolute -inset-2 bg-brand-cyan/0 group-hover:bg-brand-cyan/20 rounded-full blur-lg group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 -z-10" />
            </div>
          </motion.a>

          <motion.a
            href={`mailto:${config.email}`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="group text-gray-400 hover:text-brand-indigo transition-colors pointer-events-auto"
          >
            <div className="relative">
              <Mail size={24} />
              <div className="absolute -inset-2 bg-brand-indigo/0 group-hover:bg-brand-indigo/20 rounded-full blur-lg group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 -z-10" />
            </div>
          </motion.a>
        </div>

        {/* Text - Designed & Developed */}
        <div className="flex flex-col gap-3">
          <p className="text-gray-300 font-sans text-lg">
            Designed & Developed by{" "}
            <span className="bg-linear-to-r from-brand-indigo via-brand-cyan to-brand-indigo text-transparent bg-clip-text font-semibold">
              {config.name}
            </span>
          </p>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="group relative mt-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-indigo/20 hover:border-brand-indigo/50 transition-all duration-300 pointer-events-auto"
        >
          <ArrowUp
            size={20}
            className="text-gray-300 group-hover:text-brand-indigo transition-colors"
          />
          <div className="absolute -inset-1 bg-brand-indigo/0 group-hover:bg-brand-indigo/30 rounded-full blur-lg group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 -z-10" />
        </motion.button>

        {/* Legal - Clean Copyright */}
        <div className="pt-8 w-full border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-2 text-xs font-mono text-gray-600">
          <p>© 2026 {config.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
