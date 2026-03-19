import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { educationData } from "../../data/education";

const Education = () => {
  return (
    <section id="education" className="py-24 relative z-10 bg-black/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Academic <span className="text-brand-cyan">Background</span>
          </h2>
          <div className="w-20 h-1 bg-brand-cyan rounded-full box-glow mx-auto md:mx-0" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {educationData.map((edu, index) => {
            const Icon = edu.icon || BookOpen;
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="glass-card rounded-[2rem] h-full p-8 md:p-10 flex flex-col relative overflow-hidden group">
                  {/* Decorative background number */}
                  <div className="absolute -bottom-8 -right-8 text-9xl font-display font-black text-white/[0.02] pointer-events-none select-none group-hover:scale-110 group-hover:text-brand-cyan/[0.05] transition-all duration-700">
                    0{index + 1}
                  </div>

                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center text-brand-cyan border border-brand-cyan/20 group-hover:border-brand-cyan group-hover:box-glow transition-all duration-500">
                      <Icon size={32} />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
                      {edu.duration}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                      {edu.degree}
                    </h3>
                    <h4 className="text-xl font-medium text-gray-300 mb-2">
                      {edu.institution}
                    </h4>
                    <div className="inline-block text-brand-cyan font-bold mb-6">
                      {edu.grade}
                    </div>

                    <p className="text-gray-400 text-base leading-relaxed mb-6">
                      {edu.description}
                    </p>

                    <div>
                      <span className="text-sm font-medium text-white tracking-wide uppercase mb-3 block">
                        Relevant Coursework
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="text-xs px-3 py-1.5 rounded-md bg-black/40 border border-white/5 text-gray-400"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
