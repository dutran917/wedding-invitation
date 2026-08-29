import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FAF7F2",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding.example.com"),
  title: "Quốc Du & Phương Ly — Wedding Invitation",
  description: "Trân trọng kính mời quý khách tới dự lễ thành hôn của Quốc Du & Phương Ly vào lúc 17:00 ngày 28.11.2026 tại Thiên Trang Palace Cẩm Phả, Quảng Ninh",
  openGraph: {
    title: "Quốc Du & Phương Ly — Wedding Invitation",
    description: "Save the Date — 28.11.2026 | Thiên Trang Palace Cẩm Phả, Quảng Ninh",
    images: [
      {
        url: "/image/wedding/T_T00859.JPG",
        width: 1200,
        height: 630,
        alt: "Quốc Du & Phương Ly Wedding",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans bg-[#181513] selection:bg-gold-200 selection:text-espresso-500">
        {children}
      </body>
    </html>
  );
}
