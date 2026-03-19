import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Code2 } from "lucide-react";
import { achievements } from "../../data/achievements";

const colorMap = {
  amber:
    "text-amber-400 bg-amber-400/10 border-amber-400/20 group-hover:border-amber-400/50",
  blue: "text-blue-400 bg-blue-400/10 border-blue-400/20 group-hover:border-blue-400/50",
  "brand-indigo":
    "text-brand-indigo bg-brand-indigo/10 border-brand-indigo/20 group-hover:border-brand-indigo/50",
  "brand-cyan":
    "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20 group-hover:border-brand-cyan/50",
};

const getAchievementConfig = (id) => {
  const configs = {
    1: {
      borderColor: "border-l-4 border-l-orange-500",
      bgGlow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
      badge: "DSA",
      badgeColor: "bg-orange-500/20 border-orange-500/50 text-orange-400",
      icon: Code2,
      iconBg: "bg-orange-500/20 border-orange-500/50",
      iconColor: "text-orange-400",
      metric: "200+",
    },
    2: {
      borderColor: "border-l-4 border-l-amber-500",
      bgGlow: "hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]",
      badge: "Hackathon",
      badgeColor: "bg-amber-500/20 border-amber-500/50 text-amber-400",
      icon: Trophy,
      iconBg: "bg-amber-500/20 border-amber-500/50",
      iconColor: "text-amber-400",
      stateTag: "State Level",
    },
  };
  return configs[id] || configs[1];
};

const Achievements = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".achieve-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".achieve-grid",
            start: "top 80%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative w-full"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Key <span className="text-brand-cyan text-glow">Milestones</span>.
          </h2>
          <p className="text-gray-300 font-sans max-w-2xl text-base">
            Recognitions, competitive achievements, and growth milestones.
          </p>
        </div>

        {/* Grid layout - 3 columns */}
        <div className="achieve-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => {
            const config = getAchievementConfig(item.id);
            const Icon = config.icon;

            return (
              <a
                key={item.id}
                href={item.verifyURL || undefined}
                target={item.verifyURL ? "_blank" : undefined}
                rel={item.verifyURL ? "noreferrer" : undefined}
                className={`achieve-card relative group rounded-2xl p-6 md:p-8 border border-white/10 bg-white/8 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300 ${config.borderColor} ${config.bgGlow} overflow-hidden ${item.verifyURL ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Badge */}
                    <div
                      className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold mb-4 ${config.badgeColor}`}
                    >
                      {config.badge || config.stateTag}
                    </div>

                    {/* Metric (for LeetCode) */}
                    {config.metric && (
                      <div className="mb-4">
                        <div className="text-5xl font-display font-black text-orange-400 leading-none">
                          {config.metric}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          problems solved
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Middle Section */}
                  <div className="my-6">
                    <div
                      className={`p-4 w-fit rounded-xl border mb-4 ${config.iconBg}`}
                    >
                      <Icon size={28} className={config.iconColor} />
                    </div>

                    <h3 className="text-xl font-display font-bold text-white mb-1 leading-tight">
                      {item.title}
                    </h3>

                    {config.stateTag && (
                      <span className="inline-block text-xs font-semibold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-1 rounded mt-2 mr-2">
                        {config.stateTag}
                      </span>
                    )}

                    <p className="text-sm font-sans text-gray-400 mt-2">
                      {item.issuer}
                    </p>
                    <p className="text-xs font-mono text-gray-500 mt-1">
                      {item.date}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    {item.description && (
                      <p className="text-xs text-gray-400 mt-4">
                        {item.description}
                      </p>
                    )}
                    {item.verifyURL && (
                      <p className="text-xs font-mono text-brand-cyan mt-4 font-semibold group-hover:text-white transition-colors">
                        → View details
                      </p>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
