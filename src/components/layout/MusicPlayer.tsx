"use client";

import React, { useState, useRef, useEffect } from "react";
import { Music, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  autoPlay?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  src,
  title = "Wedding Melody",
  artist = "Orchestra",
  autoPlay = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const startAudio = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay policy prevented immediate playback
        });
    };

    if (autoPlay) {
      // 1. Attempt immediate playback
      startAudio();

      // 2. Add one-time unlock listeners for mobile (touch/scroll/click)
      const handleUserUnlock = () => {
        if (!isPlaying) {
          startAudio();
        }
        cleanupListeners();
      };

      const cleanupListeners = () => {
        window.removeEventListener("touchstart", handleUserUnlock);
        window.removeEventListener("scroll", handleUserUnlock);
        window.removeEventListener("click", handleUserUnlock);
      };

      window.addEventListener("touchstart", handleUserUnlock, { once: true, passive: true });
      window.addEventListener("scroll", handleUserUnlock, { once: true, passive: true });
      window.addEventListener("click", handleUserUnlock, { once: true, passive: true });

      return () => {
        cleanupListeners();
      };
    }
  }, [autoPlay, isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Play error:", err));
    }
  };

  return (
    <div className="fixed top-5 right-5 z-40">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc nền"}
        className="group relative flex items-center justify-center p-2 rounded-full bg-ivory-50/90 backdrop-blur-md border border-gold-400/50 shadow-md text-espresso-400 hover:text-espresso-500 hover:border-gold-500 transition-all duration-300 active:scale-95"
      >
        {/* Spinning vinyl disc */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center border border-gold-400/60 bg-gradient-to-tr from-cream-200 via-ivory-50 to-cream-100 shadow-inner ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "4s" }}
        >
          {isPlaying ? (
            <Music className="w-3.5 h-3.5 text-gold-600" />
          ) : (
            <Play className="w-3.5 h-3.5 text-gold-600 ml-0.5" />
          )}
        </div>

        {/* Sound wave equalizer animation */}
        <div className="flex items-center gap-[2.5px] ml-2 mr-1">
          <span
            className={`w-[2px] bg-gold-600 rounded-full transition-all duration-300 ${
              isPlaying ? "h-3.5 animate-pulse" : "h-1.5 opacity-30"
            }`}
          />
          <span
            className={`w-[2px] bg-gold-600 rounded-full transition-all duration-300 ${
              isPlaying ? "h-5 animate-pulse delay-75" : "h-2 opacity-30"
            }`}
          />
          <span
            className={`w-[2px] bg-gold-600 rounded-full transition-all duration-300 ${
              isPlaying ? "h-2.5 animate-pulse delay-150" : "h-1.5 opacity-30"
            }`}
          />
        </div>
      </button>
    </div>
  );
};
