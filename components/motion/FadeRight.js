"use client";
import { motion } from "framer-motion";
import { motionConfig } from "./config";

export default function FadeRight({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: motionConfig.duration,
        ease: motionConfig.ease,
        delay,
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
