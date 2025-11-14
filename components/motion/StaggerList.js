"use client";
import { motion } from "framer-motion";
import { motionConfig } from "./config";

export default function StaggerList({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: motionConfig.stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: motionConfig.duration, ease: motionConfig.ease }}
    >
      {children}
    </motion.div>
  );
}
