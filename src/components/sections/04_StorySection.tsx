"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { BotanicalDivider } from "@/components/ui/BotanicalOrnament";
import { Heart } from "lucide-react";

interface StorySectionProps {
  config: WeddingConfig;
}

export const StorySection: React.FC<StorySectionProps> = ({ config }) => {
  const { story } = config;

  // Real photos mapped to each milestone
  const milestonePhotos = [
    "/image/wedding/T_T00018.JPG",
    "/image/wedding/T_T00780.JPG",
    "/image/wedding/T_T00817.JPG",
    "/image/wedding/T_T01187.JPG",
  ];

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 bg-[#FAF7F2] text-espresso-400 overflow-hidden">
      <div className="text-center mb-12 max-w-[400px] mx-auto">
        <span className="font-sans text-[10px] tracking-ultra text-gold-600 uppercase font-semibold">
          {story.subtitle}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          {story.heading}
        </h2>
        <BotanicalDivider variant="minimal" />

        <p className="font-serif italic text-sm sm:text-base text-espresso-300 max-w-xs mx-auto mt-3 leading-relaxed">
          "{story.quote}"
        </p>
      </div>

      {/* Story Timeline Cards with Scattered Photos */}
      <div className="max-w-[400px] mx-auto space-y-12 relative">
        {/* Central golden vertical timeline thread */}
        <div className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-gold-400/50 to-transparent pointer-events-none" />

        {story.timeline.map((item, idx) => {
          const isEven = idx % 2 === 0;
          const photoSrc = milestonePhotos[idx] || "/image/wedding/T_T00018.JPG";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative bg-white/90 border border-gold-300/40 p-3 sm:p-4 rounded-xs shadow-paper"
            >
              {/* Timeline Header Badge */}
              <div className="flex items-center justify-between border-b border-gold-200/50 pb-2 mb-3">
                <span className="font-serif text-xs font-semibold text-gold-700 tracking-widest uppercase">
                  {item.date}
                </span>
                <span className="font-sans text-[9px] tracking-wider text-espresso-300 uppercase">
                  Chương {idx + 1}
                </span>
              </div>

              {/* Photo Frame in Story */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xs bg-cream-100 mb-3 shadow-inner group">
                <Image
                  src={photoSrc}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-2 left-2.5 font-script text-2xl text-ivory-50 drop-shadow-md">
                  {item.subtitle}
                </span>
              </div>

              {/* Title & Description */}
              <div className="text-center px-1">
                <h3 className="font-serif text-lg text-espresso-500 font-medium tracking-wide">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="font-serif italic text-xs text-espresso-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
