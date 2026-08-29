"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { DesktopContainer } from "@/components/layout/DesktopContainer";
import { ToastProvider } from "@/components/layout/Toast";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { InvitationOpening } from "@/components/layout/InvitationOpening";

import { HeroSection } from "@/components/sections/01_HeroSection";
import { CalendarInvitationSection } from "@/components/sections/02_CalendarInvitationSection";
import { AlbumOfLoveSection } from "@/components/sections/03_AlbumOfLoveSection";
import { CinematicLoveBanner } from "@/components/sections/09_CinematicLoveBanner";
import { EventsSection } from "@/components/sections/07_EventsSection";
import { GallerySection } from "@/components/sections/08_GallerySection";
import { VenueSection } from "@/components/sections/10_VenueSection";
import { RSVPSection } from "@/components/sections/11_RSVPSection";
import { GiftSection } from "@/components/sections/12_GiftSection";
import { JustMarriedSection } from "@/components/sections/13_JustMarriedSection";
import { GuestbookSection } from "@/components/sections/12_GuestbookSection";

export const WeddingPage: React.FC = () => {
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [guest, setGuest] = useState({ name: "", salutation: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuest({
      name: params.get("guest")?.trim() || "",
      salutation: params.get("xung-ho")?.trim() || "",
    });
  }, []);

  return (
    <ToastProvider>
      <AnimatePresence>
        {!invitationOpened && (
          <InvitationOpening
            config={weddingConfig}
            guestName={guest.name}
            salutation={guest.salutation}
            onOpened={() => setInvitationOpened(true)}
          />
        )}
      </AnimatePresence>
      <DesktopContainer>
        {/* Floating Music Player */}
        <MusicPlayer
          src={weddingConfig.music.src}
          title={weddingConfig.music.title}
          artist={weddingConfig.music.artist}
          autoPlay={weddingConfig.music.autoPlay}
          visible={invitationOpened}
        />

        {/* 01. HERO / SAVE THE DATE */}
        <HeroSection config={weddingConfig} isRevealed={invitationOpened} />

        {/* 02. CALENDAR & FORMAL INVITATION */}
        <CalendarInvitationSection
          config={weddingConfig}
          guestName={guest.name}
          salutation={guest.salutation}
        />

        {/* 03. ALBUM OF LOVE / STAGGERED COUPLE FRAMES */}
        <AlbumOfLoveSection config={weddingConfig} />

        {/* 04. ALL OF ME LOVE ALL OF YOU BANNER */}
        <CinematicLoveBanner config={weddingConfig} />

        {/* 05. WEDDING TIMELINE & EVENTS */}
        <EventsSection config={weddingConfig} />

        {/* 06. EDITORIAL PHOTO GALLERY & THUMBNAILS */}
        <GallerySection config={weddingConfig} />

        {/* 07. VENUE LOCATION & MAPS */}
        <VenueSection config={weddingConfig} />

        {/* 08. RSVP FORM */}
        <RSVPSection config={weddingConfig} guestName={guest.name} />

        {/* 09. GUEST WISHES */}
        <GuestbookSection />

        {/* 10. WEDDING GIFT & QR */}
        <GiftSection config={weddingConfig} />

        {/* 11. JUST MARRIED CLOSING & PARENTS CARD */}
        <JustMarriedSection config={weddingConfig} />
      </DesktopContainer>
    </ToastProvider>
  );
};
