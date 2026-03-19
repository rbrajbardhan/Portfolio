import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap } from "lucide-react";
import { certificates } from "../../data/certificates";

gsap.registerPlugin(ScrollTrigger);

const getProviderConfig = (provider) => {
  const config = {
    HackerRank: {
      borderColor: "border-l-4 border-l-green-500",
      bgGlow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]",
      iconBg: "bg-green-500/20 border-green-500/50",
      iconColor: "text-green-400",
      icon: "⚡",
    },
    NPTEL: {
      borderColor: "border-l-4 border-l-orange-500",
      bgGlow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
      iconBg: "bg-orange-500/20 border-orange-500/50",
      iconColor: "text-orange-400",
      icon: "📚",
    },
    "LPU / iamneo": {
      borderColor: "border-l-4 border-l-cyan-500",
      bgGlow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
      iconBg: "bg-cyan-500/20 border-cyan-500/50",
      iconColor: "text-cyan-400",
      icon: "🎓",
    },
  };
  return config[provider] || config["HackerRank"];
};

const Certificates = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".certificate-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
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
      id="certificates"
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative w-full border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 relative">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-2">
            My <span className="text-brand-cyan">Certificates</span>
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-brand-indigo to-transparent rounded-full mt-4 mb-8"></div>
          <p className="text-gray-300 max-w-xl text-base">
            Verified courses and professional certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => {
            const config = getProviderConfig(cert.provider);
            return (
              <a
                key={cert.id}
                href={cert.credentialURL || undefined}
                target={cert.credentialURL ? "_blank" : undefined}
                rel={cert.credentialURL ? "noreferrer" : undefined}
                className={`certificate-card relative group rounded-2xl p-6 border border-white/10 bg-white/8 backdrop-blur-xl flex flex-col gap-4 hover:-translate-y-2 transition-all duration-300 ${config.borderColor} ${config.bgGlow} overflow-hidden ${
                  cert.credentialURL ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${config.iconBg} text-xl`}
                  >
                    {config.icon}
                  </div>
                  <div className="text-left flex-1 pt-1">
                    <h3 className="text-lg font-display font-bold text-white leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 mt-1">
                      {cert.provider} • {cert.date}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 flex-1">
                  {cert.description}
                </p>

                {cert.credentialURL && (
                  <span className="text-xs font-mono text-brand-cyan font-semibold group-hover:text-white transition-colors inline-block mt-2">
                    → View Credential
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
