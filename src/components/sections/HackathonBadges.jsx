import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Trophy,
  Code2,
  Flame,
  Target,
  Zap,
  Medal,
  Award,
  Star,
} from "lucide-react";
import { SiCplusplus, SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaC } from "react-icons/fa6";
import { config } from "../../data/config";

gsap.registerPlugin(ScrollTrigger);

const hackathonData = [
  {
    id: 1,
    title: "Code-A-Haunt 2.0",
    organizer: "Coding Blocks LPU",
    // level: "State Level",
    result: "Advanced to Round 2",
    date: "Feb 2025",
    icon: Trophy,
    color: "amber",
    verifyURL:
      "https://drive.google.com/file/d/11UsiYU8MGkYnHPVsv_Ba1SIe7oWjhi6C/view",
    highlights: [
      "Competitive coding hackathon among statewide participants",
      "Advanced beyond initial elimination rounds",
      "Built problem-solving skills under time pressure",
    ],
  },
];

const myBadges = [
  { name: "CPP", icon: SiCplusplus, rating: 4 },
  { name: "Java", icon: FaJava, rating: 3 },
  { name: "Python", icon: SiPython, rating: 3 },
  { name: "C language", icon: FaC, rating: 4 },
];

const HackathonBadges = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState("leetcode");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hb-animate",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hackathon-badges"
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative w-full border-t border-white/5"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="hb-animate flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Hackathons & <span className="text-yellow-400">Badges</span>.
          </h2>
          <p className="text-gray-400 font-sans max-w-xl text-base">
            Competitive programming milestones and hackathon achievements.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="hb-animate flex justify-center mb-12">
          <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab("leetcode")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "leetcode"
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Code2 size={16} className="inline mr-2" />
              LeetCode
            </button>
            <button
              onClick={() => setActiveTab("hackathon")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "hackathon"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Trophy size={16} className="inline mr-2" />
              Hackathons
            </button>
          </div>
        </div>

        {/* LeetCode Tab */}
        {activeTab === "leetcode" && (
          <div className="space-y-8">
            {/* Badges */}
            <div className="hb-animate pt-6 pb-2 border-t border-white/5 mt-8">
              <h3 className="text-2xl font-display font-semibold text-white mb-10 flex items-center gap-3">
                <Award size={24} className="text-gray-300" />
                My Badges
              </h3>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                {myBadges.map((badge, i) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={i}
                      className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-2 hover:drop-shadow-[0_12px_24px_rgba(255,255,255,0.05)]"
                    >
                      <div className="relative w-[130px] h-[150px]">
                        {/* Outer border hexagon */}
                        <div
                          className="absolute inset-0 bg-[#354358]"
                          style={{
                            clipPath:
                              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          }}
                        />
                        {/* Inner hexagon */}
                        <div
                          className="absolute inset-[3px] bg-gradient-to-b from-[#eaf2f3] to-[#c1cfd3] flex flex-col items-center justify-center p-2 hover:from-[#f4fbfc] hover:to-[#cddee2] transition-colors duration-300"
                          style={{
                            clipPath:
                              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          }}
                        >
                          <Icon
                            size={46}
                            className="mb-3 text-[#2d3b4e] drop-shadow-sm"
                          />
                          <span className="font-bold text-[14px] tracking-wide text-[#2d3b4e]">
                            {badge.name}
                          </span>
                          <div className="flex gap-1.5 mt-2.5">
                            {[...Array(badge.rating)].map((_, idx) => (
                              <Star
                                key={idx}
                                size={10}
                                className="fill-[#2d3b4e] text-[#2d3b4e]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LeetCode Profile Link */}
            <div className="hb-animate flex justify-center">
              <a
                href={config.social.leetcode}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-orange-500/10 border border-orange-500/30 text-orange-400 font-display font-semibold rounded-xl transition-all duration-300 hover:bg-orange-500/20 hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]"
              >
                <Code2
                  size={20}
                  className="group-hover:rotate-12 transition-transform"
                />
                View LeetCode Profile
              </a>
            </div>
          </div>
        )}

        {/* Hackathon Tab */}
        {activeTab === "hackathon" && (
          <div className="space-y-6">
            {hackathonData.map((hack) => {
              const Icon = hack.icon;
              return (
                <div
                  key={hack.id}
                  className="hb-animate group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                >
                  {/* Left border accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-yellow-600" />

                  <div className="p-8 md:p-10 ml-2">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Icon */}
                      <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/30 w-fit">
                        <Icon size={32} className="text-amber-400" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-2xl font-display font-bold text-white">
                            {hack.title}
                          </h3>
                          <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
                            {hack.level}
                          </span>
                        </div>

                        <p className="text-sm text-gray-400 mb-1">
                          Organized by{" "}
                          <span className="text-white font-medium">
                            {hack.organizer}
                          </span>
                        </p>
                        <p className="text-xs font-mono text-gray-500 mb-4">
                          {hack.date}
                        </p>

                        {/* Result badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold rounded-lg mb-5">
                          <Zap size={16} />
                          {hack.result}
                        </div>

                        {/* Highlights */}
                        <ul className="space-y-2">
                          {hack.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-gray-300"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>

                        {/* Verify link */}
                        {hack.verifyURL && (
                          <a
                            href={hack.verifyURL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 mt-5 text-sm text-brand-cyan hover:text-white transition-colors font-medium"
                          >
                            View Certificate →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* More coming soon */}
            <div className="hb-animate rounded-2xl p-8 border-2 border-dashed border-white/15 bg-white/3 flex flex-col items-center justify-center text-center gap-3 min-h-40 hover:border-amber-500/30 transition-colors">
              <span className="text-4xl">🏅</span>
              <p className="text-white/60 font-display font-semibold">
                More Hackathons Coming
              </p>
              <p className="text-xs text-gray-500">
                Actively participating in coding competitions
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HackathonBadges;
