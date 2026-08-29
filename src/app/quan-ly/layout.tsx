import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý phản hồi — Quốc Du & Phương Ly",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
