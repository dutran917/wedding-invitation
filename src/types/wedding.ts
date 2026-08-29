export interface PersonConfig {
  name: string;
  fullName: string;
  role: string;
  title: string;
  image: string;
  parents: {
    father: string;
    mother: string;
  };
  quote?: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
  icon: "camera" | "ring" | "dinner" | "party" | "heart" | "music" | "car";
}

export interface StoryMilestone {
  date: string;
  title: string;
  subtitle: string;
  image?: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  aspectRatio?: "portrait" | "landscape" | "square" | "panoramic";
  caption?: string;
  layoutType?: "full" | "overlap" | "polaroid" | "portrait-tall" | "editorial-strip";
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch?: string;
  qrCodeImage?: string;
  role: "groom" | "bride";
  title: string;
}

export interface WeddingConfig {
  groom: PersonConfig;
  bride: PersonConfig;
  weddingDate: string; // ISO date format "YYYY-MM-DD"
  weddingTime: string;
  lunarDate: string;
  saveTheDateText: string;
  invitationIntro: string;
  venue: {
    name: string;
    subVenue?: string;
    address: string;
    mapsUrl: string;
    embedMapsUrl?: string;
  };
  events: TimelineEvent[];
  story: {
    heading: string;
    subtitle: string;
    quote: string;
    timeline: StoryMilestone[];
  };
  gallery: GalleryItem[];
  loveQuote: {
    title: string;
    highlight: string;
    content: string;
    author?: string;
    backgroundImage?: string;
  };
  gift: {
    title: string;
    description: string;
    accounts: BankAccount[];
  };
  music: {
    src: string;
    title: string;
    artist: string;
    autoPlay: boolean;
  };
  closing: {
    thankYouText: string;
    message: string;
    image: string;
  };
}
