"use client";
import { motion } from "framer-motion";
import { motionConfig } from "./config";

export default function FadeLeft({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}   // décalage vers la droite
      whileInView={{ opacity: 1, x: 0 }} // revient à sa place
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
