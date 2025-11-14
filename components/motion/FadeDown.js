export default function FadeDown({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
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
