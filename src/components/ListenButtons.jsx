import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaApple, FaSpotify, FaYoutube } from "react-icons/fa";

export default function ListenButtons({ links }) {
  if (!links) return null;

  const button = (platform, Icon, color) => {
    const url = links[platform];
    if (!url) return null;

    return (
      <motion.a
        key={platform}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={`Open on ${platform}`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className={`px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-sm flex items-center gap-2
        hover:${color} hover:shadow-lg hover:border-current transition`}
      >
        <Icon className="text-lg" /> {platform}
      </motion.a>
    );
  };

  return (
    <div className="mt-3 mb-4">
      <p className="text-xs text-gray-500 mb-1">Listen on</p>
      <div className="flex gap-2 flex-wrap">
        {button("apple", FaApple, "text-white")}
        {button("spotify", FaSpotify, "text-green-400")}
        {button("youtube", FaYoutube, "text-red-400")}
      </div>
    </div>
  );
}
