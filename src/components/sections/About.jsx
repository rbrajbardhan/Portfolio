import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Terminal, Download, Linkedin } from "lucide-react";
import { config } from "../../data/config";
import MagneticButton from "../ui/MagneticButton";

// Animated Counter Component
const AnimatedCounter = ({
  from = 0,
  to,
  duration = 2,
  decimals = 0,
  suffix = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Create a raw motion value that starts at `from`
  const motionValue = useSpring(from, {
    duration: duration * 1000,
    bounce: 0,
  });

  // When the component comes into view, animate to the target value
  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, motionValue, to]);

  // Transform the raw value into a formatted string
  const rounded = useTransform(motionValue, (latest) => {
    if (decimals > 0) {
      return latest.toFixed(decimals) + suffix;
    }
    return Math.floor(latest) + suffix;
  });

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const CounterCard = ({ label, targetValue, decimals = 0, suffix = "" }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group relative w-full glass-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:border-brand-cyan/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden cursor-none"
  >
    {/* Hover Glow */}
    <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/0 via-brand-cyan/5 to-brand-indigo/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div
      className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ boxShadow: "0 0 20px rgba(6, 182, 212, 0.15)" }}
    />

    <h3 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan mb-2 relative z-10">
      <AnimatedCounter to={targetValue} decimals={decimals} suffix={suffix} />
    </h3>
    <p className="text-gray-400 font-sans text-sm font-medium uppercase tracking-wider relative z-10 text-center">
      {label}
    </p>
  </motion.div>
);

const About = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const popIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative z-10 w-full overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-indigo/15 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-brand-cyan/15 blur-[120px]" />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center max-w-7xl mx-auto relative z-10"
      >
        {/* Left Column: Photo & Availability */}
        <motion.div
          variants={fadeLeft}
          className="lg:col-span-5 relative w-full flex items-center justify-center p-4"
        >
          {/* Glowing blob behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-indigo/20 rounded-full blur-[80px] pointer-events-none" />

          {/* Floating Dots/Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-brand-cyan/40 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
              />
            ))}
          </div>

          {/* Photo Card Container */}
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full max-w-[380px] aspect-[380/460] rounded-2xl group mx-auto z-10 perspective-[1000px]"
          >
            {/* Border spin container */}
            <div className="absolute -inset-[3px] rounded-[18px] overflow-hidden group-hover:blur-sm transition-all duration-500">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#6366f1_360deg)] animate-[spin_4s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_180deg,transparent_0_340deg,#06b6d4_360deg)] animate-[spin_4s_linear_infinite]" />
            </div>

            {/* Dynamic glow behind the card on hover */}
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-indigo/30 to-brand-cyan/30 rounded-[2rem] blur-xl opacity-0 hover-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Inner background blocking the spin from taking over whole card, showing only border */}
            <div className="absolute inset-0 rounded-2xl bg-[#0a0a0f] z-10" />

            {/* Frame with padding */}
            <div className="absolute inset-0 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col z-20">
              {/* Image Container */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-brand-indigo/30 via-brand-base to-brand-cyan/20 flex items-center justify-center">
                {config.profilePhoto ? (
                  <img
                    src={config.profilePhoto}
                    alt={config.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-7xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan select-none">
                    {config.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
                {/* Subtle inner shadow overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Badges */}
            <div className="absolute -top-4 -right-2 md:-right-6 bg-brand-indigo/90 backdrop-blur text-white text-xs font-mono px-4 py-2 rounded-xl border border-brand-indigo/50 shadow-[0_0_20px_rgba(99,102,241,0.3)] z-20 pointer-events-auto">
              MERN Developer
            </div>

            {config.availability && (
              <div className="absolute -bottom-4 -left-2 md:-left-6 glass-card bg-black/60 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-xl z-20 pointer-events-auto">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-mono text-white tracking-wide">
                  {config.availabilityText}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column: Content */}
        <motion.div
          variants={fadeRight}
          className="lg:col-span-7 flex flex-col space-y-8"
        >
          {/* Header */}
          <div>
            <span className="text-brand-indigo font-mono text-sm tracking-widest uppercase mb-3 block font-semibold">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
              Passionate about building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan text-glow">
                things that matter.
              </span>
            </h2>
          </div>

          {/* Bio (Rendered as HTML from config) */}
          <div
            className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed max-w-2xl prose prose-invert prose-p:mb-5"
            dangerouslySetInnerHTML={{ __html: config.bioHtml }}
          />

          {/* Animated Counter Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
          >
            <CounterCard label="Projects Built" targetValue={3} />
            <CounterCard label="LeetCode Solved" targetValue={200} suffix="+" />
            <CounterCard label="Technologies" targetValue={7} suffix="+" />
            <CounterCard
              label="CGPA"
              targetValue={parseFloat(config.cgpa || "7.59")}
              decimals={2}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
