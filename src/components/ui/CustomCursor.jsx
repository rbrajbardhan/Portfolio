import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Update trail array (keep max 10 points)
      setTrail((prevTrail) => {
        const newTrail = [
          ...prevTrail,
          { x: e.clientX, y: e.clientY, id: crypto.randomUUID() },
        ];
        if (newTrail.length > 10) newTrail.shift();
        return newTrail;
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Trail decay cleanup
    const intervalId = setInterval(() => {
      setTrail((prevTrail) => prevTrail.slice(1));
    }, 50);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {/* Small Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-cyan pointer-events-none z-[9999] mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 28, mass: 0.1 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-brand-indigo/50 pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          backgroundColor: isHovering
            ? "rgba(99, 102, 241, 0.1)"
            : "transparent",
          borderColor: isHovering
            ? "rgba(6, 182, 212, 0.8)"
            : "rgba(99, 102, 241, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      />

      {/* Physics Trail */}
      <AnimatePresence>
        {trail.map((point, i) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-brand-indigo/30 pointer-events-none z-[9997] hidden md:block"
            style={{
              x: point.x - 3,
              y: point.y - 3,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
