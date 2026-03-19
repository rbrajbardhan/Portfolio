import { useRef } from "react";
import { motion } from "framer-motion";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";

const MagneticButton = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const ref = useRef(null);
  const { x, y } = useMagneticEffect(ref);

  const baseStyles =
    "relative inline-flex items-center justify-center rounded-full font-medium transition-colors duration-300 overflow-hidden group px-8 py-4 z-10 outline-none focus:outline-none";

  const variants = {
    primary:
      "bg-brand-cyan text-brand-base hover:bg-white outline-none focus:outline-none",
    secondary:
      "bg-transparent text-white border border-white/20 hover:border-brand-cyan glass-card outline-none focus:outline-none",
    ghost:
      "bg-transparent text-gray-400 hover:text-white outline-none focus:outline-none",
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2 pointer-events-none">
        {children}
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />
      )}
    </motion.button>
  );
};

export default MagneticButton;
