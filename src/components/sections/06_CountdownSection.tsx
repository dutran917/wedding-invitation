"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { BotanicalDivider } from "@/components/ui/BotanicalOrnament";

interface CountdownSectionProps {
  config: WeddingConfig;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ config }) => {
  const { weddingDate, weddingTime } = config;

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTime = () => {
      const targetTime = new Date(`${weddingDate}T${weddingTime || "17:30"}:00`).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [weddingDate, weddingTime]);

  const units = [
    { label: "NGÀY", value: isMounted ? timeLeft.days : 0 },
    { label: "GIỜ", value: isMounted ? timeLeft.hours : 0 },
    { label: "PHÚT", value: isMounted ? timeLeft.minutes : 0 },
    { label: "GIÂY", value: isMounted ? timeLeft.seconds : 0 },
  ];

  return (
    <section className="relative w-full py-14 px-5 sm:px-8 bg-ivory-100 text-espresso-400">
      <div className="max-w-sm mx-auto text-center">
        <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-gold-600 uppercase font-medium">
          CÙNG ĐẾM NGƯỢC
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-espresso-500 font-normal mt-1 tracking-wide">
          Countdown To The Big Day
        </h2>
        <BotanicalDivider variant="minimal" />

        {/* Countdown Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-3 mt-8"
        >
          {units.map((unit, index) => (
            <div
              key={unit.label}
              className="bg-cream-50/90 border border-gold-300/40 rounded-sm py-4 px-2 shadow-sm flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300"
            >
              <span className="font-serif text-2xl sm:text-3xl font-light text-espresso-500 tracking-tight">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] tracking-widest text-gold-600 uppercase font-medium mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        {timeLeft.isPast && isMounted && (
          <p className="font-serif italic text-gold-600 text-sm mt-4">
            Khoảnh khắc hạnh phúc đã diễn ra trọn vẹn!
          </p>
        )}
      </div>
    </section>
  );
};
