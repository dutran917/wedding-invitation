"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { WaxSeal } from "@/components/ui/WaxSeal";

interface EnvelopeCountdownSectionProps {
  config: WeddingConfig;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const EnvelopeCountdownSection: React.FC<EnvelopeCountdownSectionProps> = ({ config }) => {
  const { groom, bride, weddingDate, weddingTime } = config;

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTime = () => {
      const targetTime = new Date(`${weddingDate}T${weddingTime || "17:00"}:00`).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [weddingDate, weddingTime]);

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 bg-[#F4EFE6] text-espresso-400 overflow-hidden">
      {/* Background floral watermark */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#8E7240_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-[380px] mx-auto relative z-10">
        {/* Envelope Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative pt-12 pb-6 flex flex-col items-center"
        >
          {/* Card Sliding Out of Envelope */}
          <div className="relative w-[90%] bg-white border border-gold-300/60 p-5 rounded-t-sm shadow-paper text-center z-10 pb-10">
            {/* Deckle/Paper Edge Effect */}
            <div className="border-b border-gold-200/50 pb-3 mb-4">
              <span className="font-sans text-[9px] tracking-widest text-espresso-300 uppercase font-medium">
                YOU'RE INVITED TO THE WEDDING OF
              </span>
              <div className="mt-1">
                <h3 className="font-script text-3xl sm:text-4xl text-espresso-500">
                  {groom.name}
                </h3>
                <span className="font-serif italic text-sm text-gold-500 -my-1 block">&</span>
                <h3 className="font-script text-3xl sm:text-4xl text-espresso-500">
                  {bride.name}
                </h3>
              </div>
            </div>

            {/* Countdown In Envelope Card */}
            <div>
              <span className="font-sans text-[8.5px] tracking-ultra text-gold-600 uppercase font-semibold block mb-2">
                IS HAPPENING IN
              </span>

              <div className="flex items-center justify-center gap-2 sm:gap-3 font-serif text-lg sm:text-xl text-espresso-500 font-light">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl sm:text-2xl text-espresso-500">
                    {isMounted ? String(timeLeft.days).padStart(2, "0") : "00"}
                  </span>
                  <span className="font-sans text-[8px] text-espresso-300 tracking-wider uppercase mt-0.5">
                    Ngày
                  </span>
                </div>
                <span className="text-gold-400 font-light -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl sm:text-2xl text-espresso-500">
                    {isMounted ? String(timeLeft.hours).padStart(2, "0") : "00"}
                  </span>
                  <span className="font-sans text-[8px] text-espresso-300 tracking-wider uppercase mt-0.5">
                    Giờ
                  </span>
                </div>
                <span className="text-gold-400 font-light -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl sm:text-2xl text-espresso-500">
                    {isMounted ? String(timeLeft.minutes).padStart(2, "0") : "00"}
                  </span>
                  <span className="font-sans text-[8px] text-espresso-300 tracking-wider uppercase mt-0.5">
                    Phút
                  </span>
                </div>
                <span className="text-gold-400 font-light -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl sm:text-2xl text-espresso-500">
                    {isMounted ? String(timeLeft.seconds).padStart(2, "0") : "00"}
                  </span>
                  <span className="font-sans text-[8px] text-espresso-300 tracking-wider uppercase mt-0.5">
                    Giây
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Envelope Pocket Base */}
          <div className="relative w-full -mt-6 z-20">
            <div className="w-full bg-[#EFE9DD] border border-gold-300/70 p-6 rounded-b-md shadow-card flex flex-col items-center relative overflow-hidden">
              {/* Envelope Triangular Fold Lines */}
              <div className="absolute top-0 left-0 w-1/2 h-full border-r border-gold-300/30 -skew-y-12 pointer-events-none" />
              <div className="absolute top-0 right-0 w-1/2 h-full border-l border-gold-300/30 skew-y-12 pointer-events-none" />

              {/* Real Wax Seal Centered */}
              <div className="relative z-30 -mt-2 my-2 cursor-pointer hover:scale-105 transition-transform">
                <WaxSeal size={70} />
              </div>

              <span className="font-serif italic text-xs text-espresso-300 mt-2 text-center tracking-wide">
                28 . 11 . 2026
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
