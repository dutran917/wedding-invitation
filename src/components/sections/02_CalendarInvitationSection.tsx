"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { MapPin, Navigation } from "lucide-react";

interface CalendarInvitationProps {
  config: WeddingConfig;
}

export const CalendarInvitationSection: React.FC<CalendarInvitationProps> = ({ config }) => {
  const { groom, bride, weddingDate, weddingTime, lunarDate, venue } = config;

  const dateObj = new Date(weddingDate);
  const year = dateObj.getFullYear() || 2026;
  const month = dateObj.getMonth() + 1; // 11 for November
  const day = dateObj.getDate() || 28;

  // Calendar for November 2026 (Nov 1 is Sunday)
  const firstDayIndex = new Date(year, month - 1, 1).getDay();
  // Monday as first day of week: Mon=0, Tue=1, ... Sun=6
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
    <section className="relative w-full py-12 px-4 sm:px-6 bg-[#FAF7F2] text-espresso-400 overflow-hidden">
      {/* Subtle floral background texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#8E7240_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-[400px] mx-auto text-center relative z-10">
        {/* Month Header in Calligraphy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-4"
        >
          <span className="font-script text-4xl sm:text-5xl text-gold-600">
            Tháng {month}
          </span>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm border border-gold-300/40 p-4 sm:p-5 rounded-xs shadow-paper mb-10"
        >
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-[10px] font-sans tracking-widest text-espresso-300 uppercase font-semibold pb-3 border-b border-gold-200/40">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THUR</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-xs font-serif pt-3 text-espresso-400">
            {calendarDays.map((d, index) => {
              if (d === null) {
                return <div key={`empty-${index}`} className="h-6 w-6" />;
              }

              const isWeddingDay = d === day;

              return (
                <div
                  key={`day-${d}`}
                  className="h-6 w-6 mx-auto flex items-center justify-center relative"
                >
                  {isWeddingDay ? (
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <span className="absolute inset-0 rounded-full border border-gold-500 bg-gold-300/20" />
                      {/* Heart indicator on top */}
                      <svg
                        className="absolute -top-1.5 -right-1 w-2.5 h-2.5 text-gold-600 fill-gold-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span className="relative z-10 font-bold text-espresso-500 text-[11px]">
                        {d}
                      </span>
                    </div>
                  ) : (
                    <span className="text-espresso-300 font-light text-[11px]">{d}</span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Couple Calligraphy & Formal Invite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="space-y-1">
            <h2 className="font-script text-4xl sm:text-5xl text-espresso-500 leading-tight">
              {groom.name}
            </h2>
            <span className="font-serif italic text-xl text-gold-500 block">&</span>
            <h2 className="font-script text-4xl sm:text-5xl text-espresso-500 leading-tight">
              {bride.name}
            </h2>
          </div>

          <div className="pt-2">
            <p className="font-sans text-[10px] tracking-widest text-espresso-300 uppercase font-medium">
              LỄ THÀNH HÔN CỦA CHÚNG TÔI ĐƯỢC TỔ CHỨC VÀO NGÀY
            </p>
            <div className="flex items-center justify-center gap-3 my-2 text-2xl sm:text-3xl font-serif text-espresso-500">
              <span>{String(day).padStart(2, "0")}</span>
              <span className="text-gold-400 font-light">|</span>
              <span>{String(month).padStart(2, "0")}</span>
              <span className="text-gold-400 font-light">|</span>
              <span>{year}</span>
            </div>
            <p className="font-sans text-xs tracking-wider text-espresso-400 font-semibold uppercase">
              LÚC {weddingTime}, THỨ BẢY
            </p>
            {lunarDate && (
              <p className="font-serif italic text-xs text-gold-600 mt-0.5">
                ({lunarDate})
              </p>
            )}
          </div>

          {/* Venue & Direct Map Button */}
          <div className="pt-4 pb-2 border-t border-gold-300/30 max-w-xs mx-auto">
            <p className="font-serif text-base text-espresso-500 font-medium tracking-wide">
              TẠI {venue.name}
            </p>
            {venue.subVenue && (
              <p className="font-sans text-[10px] tracking-wider text-gold-600 uppercase mt-0.5">
                {venue.subVenue}
              </p>
            )}
            <p className="font-serif text-xs text-espresso-300 italic mt-0.5">
              {venue.address}
            </p>

            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 mt-4 py-2 px-5 rounded-full border border-gold-500/60 bg-cream-50/80 hover:bg-gold-500 hover:text-white text-espresso-400 font-sans text-[11px] tracking-widest uppercase font-medium shadow-xs transition-all duration-300 active:scale-95"
            >
              <Navigation className="w-3 h-3 text-gold-600 fill-gold-600" />
              <span>CHỈ ĐƯỜNG</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
