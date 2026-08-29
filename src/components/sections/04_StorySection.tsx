"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { BotanicalDivider } from "@/components/ui/BotanicalOrnament";
import { Heart } from "lucide-react";

interface StorySectionProps {
  config: WeddingConfig;
}

export const StorySection: React.FC<StorySectionProps> = ({ config }) => {
  const { story } = config;

  return (
    <section className="relative w-full py-16 px-5 sm:px-8 bg-ivory-50 text-espresso-400 overflow-hidden">
      <div className="text-center mb-10">
        <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-gold-600 uppercase font-medium">
          {story.subtitle}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          {story.heading}
        </h2>
        <BotanicalDivider variant="minimal" />

        <p className="font-serif italic text-base sm:text-lg text-espresso-300 max-w-xs mx-auto mt-4 leading-relaxed">
          "{story.quote}"
        </p>
      </div>

      {/* Minimal Editorial Timeline */}
      <div className="relative max-w-sm mx-auto pl-6 border-l border-gold-300/40 space-y-10 my-10">
        {story.timeline.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative"
          >
            {/* Timeline node icon */}
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cream-50 border-2 border-gold-500 flex items-center justify-center shadow-sm">
              <div className="w-1 h-1 bg-gold-600 rounded-full" />
            </div>

            {/* Content */}
            <div className="space-y-1">
              <span className="font-serif text-sm tracking-widest text-gold-600 font-medium block">
                {item.date}
              </span>
              <h3 className="font-serif text-lg text-espresso-500 font-normal tracking-wide">
                {item.title}
              </h3>
              <p className="font-sans text-[11px] tracking-wider text-espresso-200 uppercase font-light">
                {item.subtitle}
              </p>
              {item.description && (
                <p className="font-serif text-xs text-espresso-300 italic pt-1 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
