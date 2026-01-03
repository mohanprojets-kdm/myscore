"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GamifiedAvatar({
  image,
  triggerKey, // pass score or tag
  title,
}: {
  image: string;
  triggerKey: string | number;
  title: string;
}) {
  return (
    <motion.div
      key={triggerKey} // 🔥 replay animation on update
      initial={{ rotateY: 0, scale: 0.9, opacity: 0 }}
      animate={{
        rotateY: [0, 180, 360], // 🔄 spin
        scale: [0.9, 1.05, 1],
        opacity: 1,
      }}
      transition={{
        duration: 0.9,
        ease: "easeInOut",
      }}
      className="relative flex justify-center"
      style={{ perspective: 1200 }}
    >
      {/* Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1.2 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-10 h-40 w-40 rounded-full bg-blue-400 blur-3xl"
      />

      {/* Avatar */}
      <motion.div
        animate={{
          y: [0, -6, 0], // idle floating
        }}
        transition={{
          repeat: 3,
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <Image
          src={image}
          alt="Avatar"
          width={260}
          height={420}
          className="drop-shadow-2xl"
          priority
        />
        <motion.h1
          key={title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-2 text-3xl font-bold tracking-wide text-gray-800"
        >
          {title}
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}
