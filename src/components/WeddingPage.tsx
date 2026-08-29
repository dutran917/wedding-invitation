"use client";

import React from "react";
import { weddingConfig } from "@/config/wedding.config";
import { DesktopContainer } from "@/components/layout/DesktopContainer";
import { ToastProvider } from "@/components/layout/Toast";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { HeroSection } from "@/components/sections/01_HeroSection";
import { InvitationSection } from "@/components/sections/02_InvitationSection";
import { CoupleSection } from "@/components/sections/03_CoupleSection";
import { StorySection } from "@/components/sections/04_StorySection";
import { WeddingDateSection } from "@/components/sections/05_WeddingDateSection";
import { CountdownSection } from "@/components/sections/06_CountdownSection";
import { EventsSection } from "@/components/sections/07_EventsSection";
import { GallerySection } from "@/components/sections/08_GallerySection";
import { LoveLetterSection } from "@/components/sections/09_LoveLetterSection";
import { VenueSection } from "@/components/sections/10_VenueSection";
import { RSVPSection } from "@/components/sections/11_RSVPSection";
import { GiftSection } from "@/components/sections/12_GiftSection";
import { ClosingSection } from "@/components/sections/13_ClosingSection";

export const WeddingPage: React.FC = () => {
  return (
    <ToastProvider>
      <DesktopContainer>
        {/* Floating Music Player */}
        <MusicPlayer
          src={weddingConfig.music.src}
          title={weddingConfig.music.title}
          artist={weddingConfig.music.artist}
          autoPlay={weddingConfig.music.autoPlay}
        />

        {/* 01. HERO / SAVE THE DATE */}
        <HeroSection config={weddingConfig} />

        {/* 02. WELCOME / INVITATION */}
        <InvitationSection config={weddingConfig} />

        {/* 03. COUPLE */}
        <CoupleSection config={weddingConfig} />

        {/* 04. OUR STORY */}
        <StorySection config={weddingConfig} />

        {/* 05. WEDDING DATE */}
        <WeddingDateSection config={weddingConfig} />

        {/* 06. COUNTDOWN */}
        <CountdownSection config={weddingConfig} />

        {/* 07. WEDDING EVENTS */}
        <EventsSection config={weddingConfig} />

        {/* 08. PHOTO GALLERY */}
        <GallerySection config={weddingConfig} />

        {/* 09. LOVE STORY / MESSAGE */}
        <LoveLetterSection config={weddingConfig} />

        {/* 10. LOCATION */}
        <VenueSection config={weddingConfig} />

        {/* 11. RSVP */}
        <RSVPSection config={weddingConfig} />

        {/* 12. GIFT / WEDDING WISH */}
        <GiftSection config={weddingConfig} />

        {/* 13. FINAL PHOTO + CLOSING */}
        <ClosingSection config={weddingConfig} />
      </DesktopContainer>
    </ToastProvider>
  );
};
