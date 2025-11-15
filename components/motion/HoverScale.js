// components/motion/HoverScale.js
"use client";
import { motion } from "framer-motion";

export default function HoverScale({ children }) {
  return (
    <motion.div
      style={{ display: "block", height: "100%" }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
