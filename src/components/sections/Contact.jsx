import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Code2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

import { config } from "../../data/config";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(),
});

const Contact = () => {
  const sectionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-stagger",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data) => {
    if (data.honeypot) return;
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          name: data.name,
          reply_to: data.email,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative w-full overflow-hidden"
    >
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-cyan/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        {/* Left Panel */}
        <div className="flex flex-col">
          {config.availability && (
            <div className="contact-stagger mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-green-500/20 text-green-400 text-xs font-mono font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {config.availabilityText}
            </div>
          )}

          <h2 className="contact-stagger text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-[1.2]">
            Let's build something extraordinary together.
          </h2>

          <div className="contact-stagger flex flex-col gap-6 mt-8">
            {[
              {
                icon: <Mail size={20} className="text-brand-cyan" />,
                label: "Email",
                value: config.email,
                href: `mailto:${config.email}`,
              },
              {
                icon: <Phone size={20} className="text-brand-indigo" />,
                label: "Phone",
                value: config.phone,
                href: `tel:${config.phone}`,
              },
              {
                icon: <MapPin size={20} className="text-brand-indigo" />,
                label: "Location",
                value: config.location,
                href: null,
              },
              {
                icon: <Github size={20} className="text-brand-cyan" />,
                label: "GitHub",
                value: config.social.github,
                href: config.social.github,
              },
              {
                icon: <Linkedin size={20} className="text-brand-indigo" />,
                label: "LinkedIn",
                value: config.social.linkedin,
                href: config.social.linkedin,
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center border-white/5">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-mono mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="text-lg hover:text-brand-cyan transition-colors pointer-events-auto break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-lg">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="contact-stagger">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-[2rem] p-8 md:p-10 border border-white/5 bg-[#13151f] shadow-2xl flex flex-col gap-6"
          >
            <input
              type="text"
              {...register("honeypot")}
              className="hidden"
              aria-hidden="true"
              tabIndex="-1"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 relative">
                <label className="text-[11px] font-mono tracking-widest text-[#6c7280] font-semibold mb-1">
                  NAME
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full bg-[#1c1f2e] border ${errors.name ? "border-red-500/50" : "border-white/5 focus:border-brand-indigo/50"} rounded-xl px-5 py-4 text-white placeholder:text-gray-600 outline-none transition-all pointer-events-auto`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <span className="absolute -bottom-5 left-2 text-[10px] text-red-400">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-[11px] font-mono tracking-widest text-[#6c7280] font-semibold mb-1">
                  EMAIL
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full bg-[#1c1f2e] border ${errors.email ? "border-red-500/50" : "border-white/5 focus:border-brand-indigo/50"} rounded-xl px-5 py-4 text-white placeholder:text-gray-600 outline-none transition-all pointer-events-auto`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <span className="absolute -bottom-5 left-2 text-[10px] text-red-400">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-[11px] font-mono tracking-widest text-[#6c7280] font-semibold mb-1">
                SUBJECT
              </label>
              <input
                type="text"
                {...register("subject")}
                className={`w-full bg-[#1c1f2e] border ${errors.subject ? "border-red-500/50" : "border-white/5 focus:border-brand-indigo/50"} rounded-xl px-5 py-4 text-white placeholder:text-gray-600 outline-none transition-all pointer-events-auto`}
                placeholder="Job Opportunity at Tech Company"
              />
              {errors.subject && (
                <span className="absolute -bottom-5 left-2 text-[10px] text-red-400">
                  {errors.subject.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-[11px] font-mono tracking-widest text-[#6c7280] font-semibold mb-1">
                MESSAGE
              </label>
              <textarea
                {...register("message")}
                rows="5"
                className={`w-full bg-[#1c1f2e] border ${errors.message ? "border-red-500/50" : "border-white/5 focus:border-brand-indigo/50"} rounded-xl px-5 py-4 text-white placeholder:text-gray-600 outline-none transition-all resize-none pointer-events-auto`}
                placeholder="Tell me about your project or opportunity..."
              ></textarea>
              {errors.message && (
                <span className="absolute -bottom-5 left-2 text-[10px] text-red-400">
                  {errors.message.message}
                </span>
              )}
            </div>

            <div className="w-full flex flex-col items-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative px-8 py-4 bg-[#6366f1] hover:bg-[#5a5dd9] text-white font-display font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden pointer-events-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <span className="relative flex items-center gap-2">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send
                    size={18}
                    className={`${isSubmitting ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"}`}
                  />
                </span>
              </button>

              <p className="text-[11px] text-gray-500 mt-6 tracking-wide text-right">
                Usually replies within 24 hours
              </p>
            </div>
          </form>

          {/* Social Icons */}
          <div className="contact-stagger mt-8 pt-8 border-t border-white/10">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-4">
              Connect
            </p>
            <div className="flex gap-3">
              <a
                href={config.social.github}
                target="_blank"
                rel="noreferrer"
                className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-gray-500/20 hover:border-gray-500/50 hover:shadow-[0_0_20px_rgba(156,163,175,0.3)]"
              >
                <Github
                  size={20}
                  className="text-gray-300 group-hover:text-white transition-colors"
                />
              </a>
              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                <Linkedin
                  size={20}
                  className="text-gray-300 group-hover:text-blue-400 transition-colors"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
