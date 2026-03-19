import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import specific icons
import {
  SiCplusplus,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiPostman,
} from "react-icons/si";

import { FaJava, FaBrain, FaUsers, FaTasks } from "react-icons/fa";
import { FaC, FaPeopleArrows } from "react-icons/fa6";

import { skills } from "../../data/skills";

// Map string names from data to actual React components
const iconMap = {
  FaJava,
  SiCplusplus,
  FaC,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiPostman,
  FaBrain,
  FaUsers,
  FaPeopleArrows,
  FaTasks,
};

const categories = [
  "All",
  "Languages",
  "Frameworks",
  "Tools/Platforms",
  "Soft Skills",
];

const getLevelStyles = (level) => {
  switch (level) {
    case "Expert":
      return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.5)]";
    case "Advanced":
      return "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20 shadow-[0_0_10px_rgba(56,189,248,0.3)]";
    case "Intermediate":
      return "bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20";
    case "Beginner":
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
};

const SkillCard = ({ skill }) => {
  const IconComponent = iconMap[skill.icon];
  // Slightly enlarge Advanced/Expert cards
  const baseScale =
    skill.level === "Advanced" || skill.level === "Expert" ? 1.02 : 1;

  return (
    <motion.div
      className="relative w-full aspect-[4/5] group"
      whileHover={{ y: -6, scale: baseScale }}
      initial={{ scale: baseScale }}
      animate={{ scale: baseScale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-between transition-all duration-300"
        style={{ "--hover-color": skill.color }}
      >
        {/* Glow effect pseudo-element controlled via group-hover in Tailwind with custom colored shadow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `0 0 20px ${skill.color}40`,
            border: `1px solid ${skill.color}80`,
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">
          {/* Top: Icon */}
          <div className="mt-2 group-hover:scale-110 transition-transform duration-300">
            {IconComponent ? (
              <IconComponent
                size={60}
                color={skill.color}
                className="drop-shadow-lg"
              />
            ) : (
              <div className="w-[60px] h-[60px] bg-gray-800 rounded-lg" />
            )}
          </div>

          {/* Bottom: Name & Badge */}
          <div className="flex flex-col items-center gap-3 w-full">
            <h3 className="font-display font-bold text-white text-lg text-center tracking-wide">
              {skill.name}
            </h3>

            <span
              className={`text-[10px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full border ${getLevelStyles(skill.level)}`}
            >
              {skill.level}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredSkills = skills.filter((skill) =>
    activeTab === "All"
      ? true
      : skill.category.toLowerCase() === activeTab.toLowerCase(),
  );

  // Animation variants for card stagger
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <section
      id="skills"
      className="py-32 px-6 lg:px-12 relative z-10 w-full max-w-7xl mx-auto min-h-screen"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Skills<span className="text-brand-indigo">.</span>
          </h2>
          {/* Animated underline on scroll */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full absolute -bottom-2 left-0"
          />
        </div>

        <p className="text-gray-400 max-w-md md:text-right font-sans">
          Curated selection of technologies I use to build scalable,
          high-performance web applications.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 overflow-x-auto hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors outline-none focus:outline-none ${
              activeTab === cat
                ? "text-brand-base"
                : "text-gray-400 hover:text-white glass-card"
            }`}
          >
            {activeTab === cat && (
              <motion.div
                layoutId="activeSkillTab"
                className="absolute inset-0 bg-white rounded-full box-glow"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 cursor-pointer">{cat}</span>
          </button>
        ))}
      </div>

      {/* Grid with Framer Motion stagger & AnimatePresence */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 relative"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              key={skill.id}
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{
                layout: { type: "spring", stiffness: 300, damping: 25 },
              }}
              className="w-full"
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Skills;
