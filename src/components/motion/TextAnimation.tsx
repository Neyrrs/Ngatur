"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface IRevealText {
  words: string;
  className: string;
}

export const RevealText: React.FC<IRevealText> = ({words, className}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const wordsNSpaces = words.match(/\S+\s*/g) || [];
  return (
    <div
      ref={ref}
      className="text-white  font-semibold leading-snug flex flex-wrap gap-x-1"
    >
      {wordsNSpaces.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: isInView ? index * 0.08 : 0,
            duration: 0.5,
            ease: "easeOut",
          }}
          className={`inline-block ${className}`}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
