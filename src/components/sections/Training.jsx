import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { trainingData } from "../../data/experience";

gsap.registerPlugin(ScrollTrigger);

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-400 mt-1 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const getTechBorderColor = (tech) => {
  const colorMap = {
    MongoDB: "border-green-500/60 text-green-300 bg-green-500/10",
    "React.js": "border-brand-cyan/60 text-brand-cyan bg-cyan-500/10",
    "Node.js": "border-green-500/60 text-green-300 bg-green-500/10",
    JWT: "border-amber-500/60 text-amber-300 bg-amber-500/10",
    Vercel: "border-white/40 text-white/80 bg-white/5",
    "Express.js": "border-green-500/60 text-green-300 bg-green-500/10",
    Render: "border-blue-500/60 text-blue-300 bg-blue-500/10",
  };
  return colorMap[tech] || "border-white/20 text-gray-300 bg-white/5";
};

const Training = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the card and its contents
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // 1. Card slides up + fades in
      tl.fromTo(
        ".training-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      // 2. Bullets stagger in (0.1s delay each)
      tl.fromTo(
        ".training-bullet",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4", // Overlap with card animation
      );

      // 3. Tech badges pop in with spring
      tl.fromTo(
        ".tech-badge",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.2",
      );

      // Metric box gentle pulse is handled via CSS or a separate continuous GSAP tween
      gsap.to(".metric-box", {
        boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="training"
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative w-full border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12 inline-block relative group">
          Training & Certifications
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full transform origin-left transition-transform group-hover:scale-x-110"></span>
        </h2>

        <div className="grid grid-cols-1 gap-8">
          {trainingData.map((item) => (
            <div
              key={item.id}
              className="training-card relative group transition-all duration-300 hover:-translate-y-2"
            >
              {/* Card Container: Dark glass card, Indigo left border, Rounded-2xl */}
              <div className="absolute inset-0 bg-white/8 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:bg-white/12 transition-colors duration-300 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]"></div>
              <div className="absolute -inset-4 bg-brand-indigo/15 rounded-3xl blur-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

              <div className="relative p-8 rounded-2xl border-l-4 border-l-brand-indigo flex flex-col md:flex-row gap-8">
                {/* Left Side: Header Info */}
                <div className="md:w-1/3 flex flex-col gap-4">
                  {/* Program Title at TOP */}
                  <div>
                    <p className="text-xl text-gray-100 font-semibold mb-4 group-hover:text-brand-cyan transition-colors duration-300 drop-shadow-sm">
                      {item.program}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-display font-bold text-white tracking-wide">
                      {item.organization}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span className="px-3 py-1 text-xs font-semibold bg-brand-cyan/20 text-brand-cyan rounded-full border border-brand-cyan/30">
                        {item.industry}
                      </span>
                      {item.certified &&
                        (item.certificateLink ? (
                          <a
                            href={item.certificateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-4 py-1.5 text-xs font-medium text-white bg-indigo-600/80 hover:bg-indigo-500 rounded-full flex items-center gap-2 border border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                            <span className="relative z-10">
                              View Certificate
                            </span>
                            <ExternalLink
                              size={12}
                              className="relative z-10 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                            />
                          </a>
                        ) : (
                          <span className="px-3 py-1.5 text-xs font-semibold bg-green-500/10 text-green-400 rounded-full border border-green-500/20 flex items-center gap-1">
                            ✓ Certified
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      {item.duration}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Right Side: Details & Achievements */}
                <div className="md:w-2/3 flex flex-col gap-6">
                  {/* Description */}
                  {item.description && (
                    <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                      {item.description.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {/* Achievements List */}
                  <ul className="space-y-3">
                    {item.achievements.map((achievement, idx) => {
                      // Highlight "30%" or specific keywords if found
                      const parts = achievement.split(/(30%)/gi);
                      return (
                        <li
                          key={idx}
                          className="training-bullet flex items-start gap-3 text-gray-300"
                        >
                          <CheckIcon />
                          <span>
                            {parts.map((part, i) =>
                              part.match(/30%/) ? (
                                <strong
                                  key={i}
                                  className="text-brand-cyan font-semibold"
                                >
                                  {part}
                                </strong>
                              ) : (
                                part
                              ),
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Metric Box */}
                  {item.metric && (
                    <div className="metric-box mt-2 inline-flex items-center gap-2 bg-brand-indigo/20 border border-brand-indigo/50 text-indigo-200 px-4 py-3 rounded-xl shadow-[0_0_10px_rgba(99,102,241,0.2)] font-medium self-start">
                      {item.metric}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {item.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`tech-badge px-3 py-1.5 text-xs font-medium rounded-lg hover:scale-105 transition-all ${getTechBorderColor(tech)} border`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
