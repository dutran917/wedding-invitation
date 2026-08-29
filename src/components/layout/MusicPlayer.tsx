"use client";

import React, { useState, useRef, useEffect } from "react";
import { Music, Play } from "lucide-react";

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
  const userPausedRef = useRef<boolean>(false);
  const isUnlockedRef = useRef<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const playAudio = () => {
      if (userPausedRef.current) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          isUnlockedRef.current = true;
        })
        .catch(() => {
          // Blocked by browser autoplay restrictions until interaction
        });
    };

    if (autoPlay) {
      // 1. Try immediate playback
      playAudio();

      // 2. Add one-time user gesture listeners
      const handleFirstGesture = () => {
        if (isUnlockedRef.current || userPausedRef.current) {
          removeListeners();
          return;
        }
        playAudio();
        removeListeners();
      };

      const removeListeners = () => {
        window.removeEventListener("touchstart", handleFirstGesture);
        window.removeEventListener("scroll", handleFirstGesture);
        window.removeEventListener("click", handleFirstGesture);
      };

      window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });
      window.addEventListener("scroll", handleFirstGesture, { once: true, passive: true });
      window.addEventListener("click", handleFirstGesture, { once: true, passive: true });

      return () => {
        removeListeners();
      };
    }
  }, [autoPlay]);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userPausedRef.current = true; // Mark as explicitly paused by user
      audio.pause();
      setIsPlaying(false);
    } else {
      userPausedRef.current = false; // Resume playback
      isUnlockedRef.current = true;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
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
        className="group relative flex items-center justify-center p-2 rounded-full bg-ivory-50/90 backdrop-blur-md border border-gold-400/50 shadow-md text-espresso-400 hover:text-espresso-500 hover:border-gold-500 transition-all duration-300 active:scale-95 cursor-pointer select-none"
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
