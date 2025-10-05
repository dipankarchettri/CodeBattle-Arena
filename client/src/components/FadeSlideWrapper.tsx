// src/components/FadeSlideWrapper.tsx
import { motion } from "framer-motion";
import React from "react";

export default function FadeSlideWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}     // start slightly right + transparent
      animate={{ opacity: 1, x: 0 }}      // fade in + slide to position
      exit={{ opacity: 0, x: -30 }}       // fade out + slide left
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
