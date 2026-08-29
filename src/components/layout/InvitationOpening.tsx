"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { WeddingConfig } from "@/types/wedding";
import { WaxSeal } from "@/components/ui/WaxSeal";

interface InvitationOpeningProps {
  config: WeddingConfig;
  guestName?: string;
  salutation?: string;
  onOpened: () => void;
}

export const InvitationOpening: React.FC<InvitationOpeningProps> = ({
  config,
  guestName,
  salutation,
  onOpened,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

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
    window.setTimeout(onOpened, 1050);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.65, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#171310] px-5"
      aria-label="Mở thiệp cưới"
    >
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.22 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 bg-[url('/image/wedding/T_T00033.JPG')] bg-cover bg-center blur-[2px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#171310]/80 to-black/90" />

      <div className="relative w-full max-w-[380px] text-center text-ivory-50">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
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
          <div className="relative my-5 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <h1 className="relative font-script text-5xl leading-[0.9] text-espresso-500">
            {config.groom.name}
          </h1>
          <span className="relative my-1 block font-serif text-xl italic text-gold-600">&</span>
          <h1 className="relative font-script text-5xl leading-[0.9] text-espresso-500">
            {config.bride.name}
          </h1>
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
              exit={{ opacity: 0, scale: 1.4 }}
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
