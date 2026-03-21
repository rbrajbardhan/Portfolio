import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  ArrowRight,
  UtensilsCrossed,
  PenTool,
} from "lucide-react";
import FeaturedProjectCard from "../ui/FeaturedProjectCard";

gsap.registerPlugin(ScrollTrigger);

import { projects } from "../../data/projects";

const categories = ["All", "AI/ML", "Full Stack"];

const getGradientPlaceholder = (projectId) => {
  const placeholders = {
    2: {
      gradient: "from-orange-600 via-red-500 to-orange-600",
      icon: UtensilsCrossed,
    },
    3: {
      gradient: "from-purple-600 via-indigo-500 to-pink-600",
      icon: PenTool,
    },
  };
  return (
    placeholders[projectId] || {
      gradient: "from-indigo-600 via-cyan-500 to-indigo-600",
      icon: null,
    }
  );
};

const RegularProjectCard = ({ project }) => {
  const placeholder = getGradientPlaceholder(project.id);
  const IconComponent = placeholder.icon;
  const projectInitial = (project.title || "?").trim().charAt(0).toUpperCase();

  return (
    <div
      className="group relative rounded-3xl overflow-hidden border border-white/15 cursor-none bg-white/8 backdrop-blur-xl"
    >
      {/* Image Container with Gradient Placeholder */}
      <div
        className={`relative w-full h-64 overflow-hidden bg-linear-to-br ${placeholder.gradient}`}
      >
        {/* Placeholder Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {IconComponent && (
            <IconComponent size={64} className="text-white/40 mb-4" />
          )}
          <span className="text-8xl font-display font-bold text-white/20">
            {projectInitial}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/10" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
          <span className="px-3 py-1 rounded-full text-xs font-mono text-white border border-white/30 bg-black/40 backdrop-blur-md">
            {project.category}
          </span>
          <span
            className={`text-xs px-3 py-1 rounded-full border font-medium ${project.status === "Live" ? "border-green-500/50 text-green-300 bg-green-500/15" : "border-amber-500/50 text-amber-300 bg-amber-500/15"}`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 relative z-20 bg-gradient-to-b from-white/5 to-brand-base/80">
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
          {project.title}
        </h3>

        <p className="text-gray-300 font-sans text-base line-clamp-2 mb-4">
          {project.shortDesc}
        </p>

        {/* Problem Solved */}
        <div className="mb-5 pb-5 border-b border-white/10">
          <p className="text-xs font-mono uppercase tracking-wider text-brand-indigo mb-1">
            Problem Solved
          </p>
          <p className="text-sm text-gray-300">{project.problemSolved}</p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(project.techStack || []).map((t, i) => (
            <span
              key={i}
              className="text-xs font-mono uppercase tracking-wider text-gray-300 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className={`flex ${project.liveURL ? "gap-3" : "gap-3"}`}>
          <a
            href={project.githubURL || "#"}
            target="_blank"
            rel="noreferrer"
            className={
              project.liveURL ? "flex-1 group/btn" : "w-full group/btn"
            }
          >
            <button className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center gap-2 font-medium text-sm">
              <Github size={16} /> GitHub
            </button>
          </a>
          {project.liveURL && (
            <a
              href={project.liveURL}
              target="_blank"
              rel="noreferrer"
              className="flex-1 group/btn"
            >
              <button className="w-full px-4 py-3 rounded-lg bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan flex items-center justify-center gap-2 font-medium text-sm">
                <ExternalLink size={16} /> Live
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef(null);

  const featuredProject = projects.find((p) => p.featured);
  const regularProjects = projects.filter(
    (p) =>
      activeTab === "All" ||
        p.category.toLowerCase().replace(" ", "") ===
          activeTab.toLowerCase().replace(" ", ""),
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative w-full overflow-hidden"
    >
      {/* Background Glow Blobs */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-brand-indigo/20 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-indigo/10 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="project-header flex flex-col items-center text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
            Featured <span className="text-brand-cyan text-glow">Work</span>.
          </h2>
          <p className="text-gray-300 font-sans max-w-2xl text-lg">
            A selection of my best projects, balancing scalable engineering with
            premium user experiences.
          </p>
        </div>

        {/* Cinematic Featured Project */}
        {featuredProject && (
          <div>
            <FeaturedProjectCard project={featuredProject} />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`cursor-none relative px-6 py-3 rounded-full font-medium transition-all text-base ${
                activeTab === cat
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === cat && (
                <div
                  className="absolute inset-0 bg-brand-indigo/30 rounded-full border border-brand-indigo/60 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Bento Grid layout for regular projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {regularProjects.map((project) => (
            <RegularProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
