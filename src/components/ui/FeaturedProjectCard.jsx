import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

const FeaturedProjectCard = ({ project }) => {
  const containerRef = useRef(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Mouse tilt effect
  const cardRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; // Tilt intensity
    const y = -(e.clientY - top - height / 2) / 25;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`;

    // Update glow position
    mouseX.current = e.clientX - left;
    mouseY.current = e.clientY - top;
    cardRef.current.style.setProperty("--m-x", `${mouseX.current}px`);
    cardRef.current.style.setProperty("--m-y", `${mouseY.current}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className="w-full mb-32 relative group perspective-1000 z-10"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-[2rem] overflow-hidden border-2 border-brand-indigo/60 transition-transform duration-300 ease-out bg-white/8 backdrop-blur-xl shadow-[0_0_50px_rgba(99,102,241,0.2)] hover:shadow-[0_0_80px_rgba(99,102,241,0.3)]"
        style={{
          transformStyle: "preserve-3d",
          "--m-x": "50%",
          "--m-y": "50%",
        }}
      >
        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex justify-between z-40">
          <div className="flex gap-3">
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-mono font-bold text-white bg-brand-indigo/30 border border-brand-indigo/60 backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              Featured
            </motion.span>
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-bold text-brand-cyan bg-brand-cyan/20 border border-brand-cyan/60 backdrop-blur-md flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              animate={{
                textShadow: [
                  "0_0_10px_rgba(6,182,212,0.5)",
                  "0_0_20px_rgba(6,182,212,0.8)",
                  "0_0_10px_rgba(6,182,212,0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={16} /> AI Powered
            </motion.span>
          </div>
        </div>

        {/* Dynamic Interactive Glow */}
        <div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at var(--m-x) var(--m-y), rgba(99, 102, 241, 0.1), transparent 40%)`,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10 pt-20 lg:pt-0">
          {/* Image Side (7 cols) - Gradient Placeholder */}
          {/* Image Side (7 cols) - Gradient Placeholder */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:h-auto overflow-hidden bg-linear-to-br from-brand-indigo via-brand-cyan to-indigo-900 flex flex-col items-center justify-center">
            <motion.div
              style={{ y }}
              className="w-full h-full relative origin-center flex flex-col items-center justify-center px-6"
            >
              {/* Giant Abstract Initial Letter */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-[200px] md:text-[300px] lg:text-[400px] leading-none font-display font-black text-white mix-blend-overlay filter blur-[1px] opacity-40">
                    {project.title.charAt(0)}
                  </span>
                </motion.div>
              </div>

              {/* Overlay Gradient to blend with text side */}
              <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-linear-to-l from-brand-surface via-brand-surface/80 to-transparent hidden lg:block z-30" />
            </motion.div>
          </div>

          {/* Content Side (5 cols) */}
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-brand-surface/90 backdrop-blur-md relative lg:-ml-12 border-l border-white/10 z-40 min-h-96 lg:min-h-auto">
            <div>
              {/* Category + Status */}
              <div
                className="flex items-center gap-3 mb-8"
                style={{ transform: "translateZ(30px)" }}
              >
                <span className="text-brand-cyan font-mono text-sm uppercase tracking-widest font-bold">
                  {project.category}
                </span>
                <span className="w-8 h-px bg-white/20" />
                <span
                  className={`text-sm px-3 py-1 rounded-full border font-bold ${project.status === "Live" ? "border-green-500/50 text-green-300 bg-green-500/15" : "border-amber-500/50 text-amber-300 bg-amber-500/15"}`}
                >
                  {project.status}
                </span>
              </div>

              <h3
                className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white mb-6 leading-tight break-words"
                style={{ transform: "translateZ(40px)" }}
              >
                {project.title}
              </h3>

              <p
                className="text-gray-300 font-sans text-base lg:text-lg mb-8 leading-relaxed"
                style={{ transform: "translateZ(20px)" }}
              >
                {project.description}
              </p>

              <div
                className="glass-card rounded-xl p-5 mb-8 border-brand-cyan/30 border-l-2 border-l-brand-cyan bg-brand-cyan/10"
                style={{ transform: "translateZ(25px)" }}
              >
                <p className="text-base font-sans text-gray-200">
                  <span className="text-brand-cyan font-bold block mb-2">
                    Problem Solved:
                  </span>
                  {project.problemSolved}
                </p>
              </div>

              <div
                className="flex flex-wrap gap-2 mb-8"
                style={{ transform: "translateZ(15px)" }}
              >
                {(project.techStack || []).map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-white/8 border border-white/15 rounded-lg text-sm font-mono text-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="flex items-center gap-4 mt-6 lg:mt-0"
              style={{ transform: "translateZ(50px)" }}
            >
              <a
                href={project.liveURL || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex-1 outline-none focus:outline-none"
              >
                <MagneticButton
                  variant="primary"
                  className="w-full py-3! px-6! text-base gap-2"
                >
                  Live Demo <ExternalLink size={18} />
                </MagneticButton>
              </a>
              <a
                href={project.githubURL || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex-1 outline-none focus:outline-none"
              >
                <MagneticButton
                  variant="secondary"
                  className="w-full py-3! px-6! text-base gap-2"
                >
                  GitHub <Github size={18} />
                </MagneticButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProjectCard;
