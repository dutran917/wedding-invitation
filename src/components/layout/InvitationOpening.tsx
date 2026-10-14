"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { WeddingConfig } from "@/types/wedding";
import { WaxSeal } from "@/components/ui/WaxSeal";

interface InvitationOpeningProps {
  config: WeddingConfig;
  guestName?: string;
  salutation?: string;
  trollMode?: boolean;
  showTrollImage?: boolean;
  onOpened: () => void;
}

export const InvitationOpening: React.FC<InvitationOpeningProps> = ({
  config,
  guestName,
  salutation,
  trollMode = false,
  showTrollImage = false,
  onOpened,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [danceActive, setDanceActive] = useState(false);
  const [beatPulse, setBeatPulse] = useState(0);
  const openingRef = useRef<HTMLDivElement | null>(null);
  const danceTimerRef = useRef<number | null>(null);
  const beatCountRef = useRef(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (danceTimerRef.current !== null) {
        window.clearTimeout(danceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!trollMode || !danceActive || showTrollImage) return;

    const handleTrollBeat = (event: Event) => {
      const { intensity = 1 } = (event as CustomEvent<{ intensity?: number }>).detail || {};
      const shake = 7 + intensity * 4;
      beatCountRef.current += 1;
      setBeatPulse((pulse) => pulse + 1);

      openingRef.current?.animate(
        [
          { transform: "translate3d(0, 0, 0) scale(1.015)" },
          { transform: `translate3d(${-shake}px, ${shake * 0.45}px, 0) rotate(-0.45deg) scale(1.025)` },
          { transform: `translate3d(${shake}px, ${-shake * 0.35}px, 0) rotate(0.4deg) scale(1.02)` },
          { transform: "translate3d(0, 0, 0) scale(1.015)" },
        ],
        { duration: 270, easing: "cubic-bezier(.2,.8,.3,1)" },
      );

      const colors = ["#FFD166", "#FF4D9D", "#7CE7FF", "#F8F4E8", "#B7FF6A"];
      const fromLeft = beatCountRef.current % 2 === 0;
      confetti({
        particleCount: beatCountRef.current % 4 === 0 ? 58 : 34,
        angle: fromLeft ? 62 : 118,
        spread: 78,
        startVelocity: 52 + intensity * 8,
        gravity: 0.72,
        scalar: 1,
        ticks: 180,
        origin: { x: fromLeft ? 0.02 : 0.98, y: 0.98 },
        colors,
        zIndex: 160,
      });

      if (beatCountRef.current % 4 === 0) {
        confetti({
          particleCount: 64,
          spread: 115,
          startVelocity: 44,
          gravity: 0.66,
          origin: { x: 0.5, y: 0.86 },
          colors,
          zIndex: 160,
        });
      }
    };

    window.addEventListener("wedding:troll-beat", handleTrollBeat);
    return () => window.removeEventListener("wedding:troll-beat", handleTrollBeat);
  }, [danceActive, showTrollImage, trollMode]);

  const openInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    window.dispatchEvent(new CustomEvent("wedding:open-invitation"));
    confetti({
      particleCount: 34,
      spread: 52,
      startVelocity: 18,
      gravity: 0.55,
      scalar: 0.75,
      origin: { x: 0.5, y: 0.56 },
      colors: ["#C2A676", "#E8D8B6", "#FAF7F2"],
    });
    if (trollMode) {
      danceTimerRef.current = window.setTimeout(() => {
        setDanceActive(true);
        danceTimerRef.current = null;
      }, 1050);
    }
    if (!trollMode) {
      window.setTimeout(onOpened, 1050);
    }
  };

  return (
    <motion.div
      ref={openingRef}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.65, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#171310] px-5"
      aria-label="Mở thiệp cưới"
    >
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.22 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 bg-[url('/image/wedding/optimized/IMG_5909.webp')] bg-cover bg-center blur-[2px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#171310]/80 to-black/90" />

      <AnimatePresence>
        {danceActive && !showTrollImage && beatPulse > 0 && (
          <motion.div
            key={beatPulse}
            initial={{ opacity: 0.28 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,214,102,0.62),rgba(255,72,153,0.14)_42%,transparent_72%)]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTrollImage && (
          <motion.div
            key="troll-image"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black p-4"
          >
            <img
              src="/image/wedding/troll_image.jpg"
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-[380px] text-center text-ivory-50">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={isOpening ? { opacity: 0, y: -18 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mb-5 font-sans text-[11px] font-medium uppercase tracking-[0.35em] text-gold-200"
        >
          {guestName ? `Thân mời ${salutation || "bạn"} ${guestName}` : "Trân trọng kính mời"}
        </motion.p>

        <motion.div
          animate={
            isOpening
              ? { y: -120, opacity: 0, scale: 0.96 }
              : { y: 0, opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full rounded-sm border border-gold-300/55 bg-[#F6F0E6] px-7 pb-12 pt-10 text-espresso-500 shadow-2xl"
        >
          <div className="absolute inset-2 border border-gold-400/25" />
          <p className="relative font-serif text-xs uppercase tracking-[0.28em] text-gold-700">
            The wedding invitation
          </p>
          <div className="relative my-4 flex flex-col items-center justify-center">
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif italic text-[6rem] leading-none text-gold-600 pointer-events-none select-none z-0"
              style={{ opacity: 0.4 }}
            >
              &
            </span>
            <h1 className="relative z-10 font-script text-5xl leading-tight text-espresso-500">
              {config.groom.name}
            </h1>
            <h1 className="relative z-10 font-script text-5xl leading-tight text-espresso-500 mt-2">
              {config.bride.name}
            </h1>
          </div>
          <p className="relative mt-6 font-serif text-sm tracking-[0.22em] text-espresso-300">
            {config.weddingDate.split("-").reverse().join(" . ")}
          </p>
        </motion.div>

        <AnimatePresence>
          {!isOpening && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={
                trollMode
                  ? {
                      y: "70vh",
                      rotate: 28,
                      opacity: 0,
                      scale: 0.82,
                      transition: { duration: 1.15, ease: [0.36, 0, 0.66, -0.2] },
                    }
                  : {
                      opacity: 0,
                      scale: 1.4,
                      transition: { duration: 0.55 },
                    }
              }
              transition={{ delay: 0.65, duration: 0.55 }}
              onClick={openInvitation}
              className="relative -mt-10 inline-flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#171310]"
              aria-label="Chạm vào con dấu để mở thiệp"
            >
              <motion.span
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full"
              >
                <WaxSeal size={82} />
              </motion.span>
              <span className="mt-3 font-sans text-[11px] uppercase tracking-[0.28em] text-ivory-200">
                Chạm để mở thiệp
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
