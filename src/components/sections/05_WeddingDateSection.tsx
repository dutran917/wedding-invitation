"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { BotanicalDivider, SubtleFloralWatermark } from "@/components/ui/BotanicalOrnament";
import { Heart } from "lucide-react";

interface WeddingDateSectionProps {
  config: WeddingConfig;
}

export const WeddingDateSection: React.FC<WeddingDateSectionProps> = ({ config }) => {
  const { weddingDate, weddingTime, lunarDate } = config;

  const dateObj = new Date(weddingDate);
  const year = dateObj.getFullYear() || 2026;
  const month = dateObj.getMonth() + 1; // 1-12
  const day = dateObj.getDate() || 8;

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  // Calendar generation for the month
  const firstDayIndex = new Date(year, month - 1, 1).getDay(); // 0 = Sun, 1 = Mon ...
  // Adjusted for Monday start: Mon=0, Tue=1, ... Sun=6
  const startDay = (firstDayIndex + 6) % 7;
  const totalDaysInMonth = new Date(year, month, 0).getDate();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= totalDaysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <section className="relative w-full py-16 px-5 sm:px-8 bg-cream-50/70 text-espresso-400 overflow-hidden">
      <SubtleFloralWatermark />

      <div className="text-center mb-8">
        <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-gold-600 uppercase font-medium">
          NGÀY TRỌNG ĐẠI
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          Save Our Date
        </h2>
        <BotanicalDivider variant="minimal" />
      </div>

      {/* Date Highlight Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto bg-ivory-50 border border-gold-400/35 p-6 sm:p-7 shadow-paper rounded-sm text-center relative"
      >
        <div className="absolute inset-1 border border-gold-400/20 pointer-events-none" />

        {/* Big editorial date display */}
        <div className="flex items-center justify-center gap-4 text-espresso-500 font-serif">
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-light">
              {String(day).padStart(2, "0")}
            </span>
          </div>
          <div className="h-10 w-[1px] bg-gold-400/50" />
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-light">
              {String(month).padStart(2, "0")}
            </span>
          </div>
          <div className="h-10 w-[1px] bg-gold-400/50" />
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-light">
              {year}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <p className="font-sans text-xs tracking-widest text-gold-600 font-semibold uppercase">
            VÀO LÚC {weddingTime}
          </p>
          {lunarDate && (
            <p className="font-serif italic text-xs text-espresso-300 mt-1">
              ({lunarDate})
            </p>
          )}
        </div>

        {/* Calendar Month Header */}
        <div className="mt-8 pt-6 border-t border-gold-300/30">
          <h3 className="font-script text-3xl text-gold-600 mb-3">
            {monthNames[month - 1]}
          </h3>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-[10px] font-sans tracking-wider text-espresso-300 font-medium pb-2">
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span>CN</span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-xs font-serif text-espresso-400">
            {calendarDays.map((d, index) => {
              if (d === null) {
                return <div key={`empty-${index}`} className="h-7 w-7" />;
              }

              const isWeddingDay = d === day;

              return (
                <div
                  key={`day-${d}`}
                  className="h-7 w-7 mx-auto flex items-center justify-center relative"
                >
                  {isWeddingDay ? (
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      {/* Gold circle or Heart highlight */}
                      <span className="absolute inset-0 rounded-full border-2 border-gold-500 bg-gold-400/20 animate-pulse-subtle" />
                      <span className="relative z-10 font-bold text-espresso-500 text-xs">
                        {d}
                      </span>
                      <Heart className="absolute -top-2 -right-1 w-3 h-3 text-gold-600 fill-gold-500" />
                    </div>
                  ) : (
                    <span className="text-espresso-300 font-light">{d}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
