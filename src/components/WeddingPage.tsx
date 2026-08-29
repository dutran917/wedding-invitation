"use client";

import React from "react";
import { weddingConfig } from "@/config/wedding.config";
import { DesktopContainer } from "@/components/layout/DesktopContainer";
import { ToastProvider } from "@/components/layout/Toast";
import { MusicPlayer } from "@/components/layout/MusicPlayer";

import { HeroSection } from "@/components/sections/01_HeroSection";
import { CalendarInvitationSection } from "@/components/sections/02_CalendarInvitationSection";
import { AlbumOfLoveSection } from "@/components/sections/03_AlbumOfLoveSection";
import { EnvelopeCountdownSection } from "@/components/sections/06_EnvelopeCountdownSection";
import { CinematicLoveBanner } from "@/components/sections/09_CinematicLoveBanner";
import { EventsSection } from "@/components/sections/07_EventsSection";
import { GallerySection } from "@/components/sections/08_GallerySection";
import { VenueSection } from "@/components/sections/10_VenueSection";
import { RSVPSection } from "@/components/sections/11_RSVPSection";
import { GiftSection } from "@/components/sections/12_GiftSection";
import { JustMarriedSection } from "@/components/sections/13_JustMarriedSection";

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

        {/* 02. CALENDAR & FORMAL INVITATION */}
        <CalendarInvitationSection config={weddingConfig} />

        {/* 03. ALBUM OF LOVE / STAGGERED COUPLE FRAMES */}
        <AlbumOfLoveSection config={weddingConfig} />

        {/* 04. LUXURY ENVELOPE & REALTIME COUNTDOWN */}
        <EnvelopeCountdownSection config={weddingConfig} />

        {/* 05. ALL OF ME LOVE ALL OF YOU BANNER */}
        <CinematicLoveBanner config={weddingConfig} />

        {/* 06. WEDDING TIMELINE & EVENTS */}
        <EventsSection config={weddingConfig} />

        {/* 07. EDITORIAL PHOTO GALLERY & THUMBNAILS */}
        <GallerySection config={weddingConfig} />

        {/* 08. VENUE LOCATION & MAPS */}
        <VenueSection config={weddingConfig} />

        {/* 09. RSVP FORM */}
        <RSVPSection config={weddingConfig} />

        {/* 10. WEDDING GIFT & QR */}
        <GiftSection config={weddingConfig} />

        {/* 11. JUST MARRIED CLOSING & PARENTS CARD */}
        <JustMarriedSection config={weddingConfig} />
      </DesktopContainer>
    </ToastProvider>
  );
};
