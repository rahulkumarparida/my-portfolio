import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BackgroundLight = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY + window.scrollY });
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", move);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", move);
    };
  }, []);

  return (
    <div
      className="absolute top-0 right-0 w-[300px] h-[300px] rounded-4xl pointer-events-none blur-3xl z-0"
      style={{
        background:
          "radial-gradient(circle at center, #0afffff8 0%, rgba(0,0,0,0) 70%)",
        mixBlendMode: "screen",
      }}
      animate={{
        x: pos.x - 125,
        y: pos.y - 125,
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 0.5,
      }}
    />
  );
};

export default BackgroundLight;
