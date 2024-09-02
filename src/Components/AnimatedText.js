import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ text , type ,delay }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: type ,delay : delay || 0 }}
      variants={variants}
    >
      {text}
    </motion.div>
  );
};

export default AnimatedText;
