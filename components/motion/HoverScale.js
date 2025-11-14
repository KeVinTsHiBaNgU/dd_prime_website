"use client";
import { motion } from "framer-motion";

export default function HoverScale({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );
}
