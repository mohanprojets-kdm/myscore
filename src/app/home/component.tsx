"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ScoreAvatar({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Glow background */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-full bg-yellow-400 blur-3xl opacity-50"
        />

        {/* Avatar */}
        <motion.div
          key={image}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <Image
            src={image}
            alt="avatar"
            width={160}
            height={160}
            className="rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Title */}
      <motion.h1
        key={title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-bold tracking-wide text-gray-800"
      >
        {title}
      </motion.h1>
    </div>
  );
}
