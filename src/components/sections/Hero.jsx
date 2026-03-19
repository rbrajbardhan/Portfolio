import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Github, Code2, Linkedin } from "lucide-react";
import ParticleField from "../ui/ParticleField";
import MagneticButton from "../ui/MagneticButton";
import useTypewriter from "../../hooks/useTypewriter";

// API Hooks
import { config } from "../../data/config";

// ... keep NoiseOverlay

const NoiseOverlay = () => (
  <div
    className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage:
        'url(\'data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E\')',
    }}
  />
);

const Hero = () => {
  const containerRef = useRef(null);
  const typeWriterText = useTypewriter(config.roles, 80, 40, 2500);

  // Intro staggering animation via GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5,
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ParticleField count={6000} />
          </Canvas>
        </Suspense>
      </div>

      {/* Noise Texture for depth */}
      <NoiseOverlay />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col items-center md:items-start text-center md:text-left pt-20">
        {/* Availability Badge */}
        {config.availability && (
          <div className="hero-element mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-cyan/20 text-brand-cyan text-xs font-mono font-medium tracking-wide">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
            </span>
            {config.availabilityText.toUpperCase()}
          </div>
        )}

        {/* Name with Glow */}
        <div className="relative inline-block mb-2">
          <div className="absolute -inset-12 bg-brand-indigo/20 blur-3xl rounded-full opacity-60 -z-10" />
        </div>
        <h1 className="hero-element text-5xl md:text-7xl lg:text-[6.5rem] font-display font-bold text-white mb-2 leading-[1.1] tracking-tight">
          Hi, I'm <br className="md:hidden" />
          <span className="bg-gradient-to-r from-brand-indigo via-brand-cyan to-white text-transparent bg-clip-text text-glow">
            {config.name}
          </span>
        </h1>

        {/* Dynamic TypeWriter */}
        <div className="hero-element text-2xl md:text-3xl lg:text-4xl font-display font-medium text-gray-300 mb-6 flex items-center justify-center md:justify-start gap-3 h-8 md:h-12 mt-4">
          <span>
            I'm a <span className="text-brand-cyan">{typeWriterText}</span>
            <span className="animate-pulse text-brand-cyan ml-1">|</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="hero-element text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-sans leading-relaxed">
          {config.tagline}
        </p>

        {/* Call To Actions */}
        <div className="hero-element flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto mb-8 relative z-50">
          <button
            onClick={handleScrollToProjects}
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-medium transition-all duration-300 overflow-hidden bg-brand-indigo text-white hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:scale-105 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
          </button>
        </div>

        {/* Social Icons Row */}
        <div className="hero-element flex items-center justify-center md:justify-start gap-6 mb-16 relative z-50">
          <a
            href={config.social.github}
            target="_blank"
            rel="noreferrer"
            className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-brand-indigo/20 hover:border-brand-indigo/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            title="GitHub"
          >
            <Github
              size={20}
              className="text-gray-300 group-hover:text-brand-indigo transition-colors"
            />
          </a>
          <a
            href={config.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-brand-cyan/20 hover:border-brand-cyan/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            title="LinkedIn"
          >
            <Linkedin
              size={20}
              className="text-gray-300 group-hover:text-brand-cyan transition-colors"
            />
          </a>
          <a
            href={config.social.leetcode}
            target="_blank"
            rel="noreferrer"
            className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-yellow-500/20 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            title="LeetCode"
          >
            <Code2
              size={20}
              className="text-gray-300 group-hover:text-yellow-400 transition-colors"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
