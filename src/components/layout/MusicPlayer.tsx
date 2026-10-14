"use client";

import React, { useState, useRef, useEffect } from "react";
import { Music, Play } from "lucide-react";

interface MusicPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  autoPlay?: boolean;
  visible?: boolean;
  loop?: boolean;
  visualizeBeats?: boolean;
  onEnded?: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  src,
  title = "Wedding Melody",
  artist = "Orchestra",
  autoPlay = true,
  visible = true,
  loop = true,
  visualizeBeats = false,
  onEnded,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef<boolean>(false);
  const isUnlockedRef = useRef<boolean>(false);
  const invitationStartedRef = useRef<boolean>(false);
  const beatFrameRef = useRef<number | null>(null);

  const stopBeatDetection = () => {
    if (beatFrameRef.current !== null) {
      window.cancelAnimationFrame(beatFrameRef.current);
      beatFrameRef.current = null;
    }
  };

  const startBeatDetection = () => {
    if (!visualizeBeats || beatFrameRef.current !== null) return;

    const audio = audioRef.current;
    if (!audio) return;

    const beatInterval = 60 / 161;
    let nextBeatAt = 0.1;
    let beatIndex = 0;

    const detectBeat = () => {
      if (!audio.paused && !audio.ended && audio.currentTime >= nextBeatAt) {
        const intensity = beatIndex % 4 === 0 ? 1.45 : beatIndex % 2 === 0 ? 1.2 : 1;
        window.dispatchEvent(
          new CustomEvent("wedding:troll-beat", {
            detail: { intensity },
          }),
        );

        beatIndex += 1;
        nextBeatAt += beatInterval;
        if (audio.currentTime - nextBeatAt > beatInterval) {
          nextBeatAt = audio.currentTime + beatInterval;
        }
      }

      beatFrameRef.current = window.requestAnimationFrame(detectBeat);
    };

    beatFrameRef.current = window.requestAnimationFrame(detectBeat);
  };

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

    const handleInvitationOpen = () => {
      invitationStartedRef.current = true;
      userPausedRef.current = false;
      startBeatDetection();
      if (autoPlay) {
        playAudio();
      }
    };

    window.addEventListener("wedding:open-invitation", handleInvitationOpen);

    return () => {
      stopBeatDetection();
      window.removeEventListener("wedding:open-invitation", handleInvitationOpen);
    };
  }, [autoPlay, visualizeBeats]);

  // Handle source changes (e.g. param troll=true)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (
      invitationStartedRef.current &&
      isUnlockedRef.current &&
      !userPausedRef.current
    ) {
      audio.load();
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Play error on track change:", err));
    }
  }, [src]);

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
    <div
      className={`fixed top-4 right-4 z-40 transition-all duration-500 md:left-1/2 md:right-auto md:ml-[142px] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
      }`}
    >
      <audio
        ref={audioRef}
        src={src}
        loop={loop}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={onEnded}
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
