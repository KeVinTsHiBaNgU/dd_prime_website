export default function StaggerList({ children }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.ul>
  );
}

// Exemple d’item
export function StaggerItem({ children }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.li>
  );
}
