import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds minimum loading time
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);

      // Easing function for progress curve (starts fast, slows down at end)
      const easedProgress = 100 - Math.pow(1 - newProgress / 100, 3) * 100;

      setProgress(easedProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500); // Small delay after hitting 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] bg-brand-base flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated SVG Logo */}
        <motion.div className="mb-12 relative w-32 h-32 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
            <motion.path
              d="M 30,70 L 30,30 L 50,30 C 60,30 65,35 65,45 C 65,55 60,60 50,60 L 30,60 M 45,60 L 65,90"
              fill="transparent"
              strokeWidth="4"
              stroke="url(#gradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 60,70 L 60,30 L 80,30 C 90,30 95,35 95,45 C 95,55 90,60 80,60 L 60,60 M 75,60 L 95,90"
              fill="transparent"
              strokeWidth="4"
              stroke="rgba(255,255,255,0.1)"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute inset-0 bg-brand-cyan/20 blur-[50px] rounded-full"
          />
        </motion.div>

        {/* Progress Text */}
        <div className="text-brand-cyan font-mono text-sm tracking-widest mb-4 flex items-center gap-2">
          <span>LOADING SYSTEM</span>
          <span className="w-12 text-right">{Math.floor(progress)}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-cyan to-brand-indigo w-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
