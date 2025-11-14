"use client";
import { motion } from "framer-motion";
import { motionConfig } from "./config";

export default function ZoomIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: motionConfig.duration + 0.1,
        ease: motionConfig.ease,
        delay,
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
