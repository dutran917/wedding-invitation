"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Link2 } from "lucide-react";

export default function GuestLinkGeneratorPage() {
  const [guestName, setGuestName] = useState("");
  const [salutation, setSalutation] = useState("Bạn");
  const [copied, setCopied] = useState(false);

  const invitationUrl = useMemo(() => {
    if (typeof window === "undefined" || !guestName.trim()) return "";
    const url = new URL("/", window.location.origin);
    url.searchParams.set("guest", guestName.trim());
    if (salutation.trim()) url.searchParams.set("xung-ho", salutation.trim());
    return url.toString();
  }, [guestName, salutation]);

  const copyLink = async () => {
    if (!invitationUrl) return;
    await navigator.clipboard.writeText(invitationUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="min-h-screen bg-[#181513] px-4 py-10 text-espresso-500">
      <div className="mx-auto max-w-lg border border-gold-400/35 bg-ivory-50 p-6 shadow-2xl sm:p-10">
        <div className="text-center">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700">
            Công cụ tạo link khách mời
          </span>
          <h1 className="mt-2 font-serif text-4xl">Tạo link thiệp riêng</h1>
          <p className="mx-auto mt-3 max-w-sm font-serif text-base leading-relaxed text-espresso-300">
            Nhập tên từng khách mời, sau đó sao chép link để gửi qua Zalo, Messenger hoặc tin nhắn.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-widest text-gold-700">
              Cách xưng hô
            </span>
            <select
              value={salutation}
              onChange={(event) => setSalutation(event.target.value)}
              className="w-full border border-gold-300/60 bg-white px-4 py-3 font-serif text-base outline-none focus:border-gold-600"
            >
              <option>Bạn</option>
              <option>Anh</option>
              <option>Chị</option>
              <option>Em</option>
              <option>Cô</option>
              <option>Chú</option>
              <option>Bác</option>
              <option>Ông bà</option>
              <option>Gia đình</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-widest text-gold-700">
              Tên khách mời
            </span>
            <input
              value={guestName}
              onChange={(event) => setGuestName(event.target.value)}
              placeholder="Ví dụ: Minh Anh"
              className="w-full border border-gold-300/60 bg-white px-4 py-3 font-serif text-base outline-none placeholder:text-espresso-100 focus:border-gold-600"
              autoFocus
            />
          </label>

          <div className="min-h-[88px] border border-dashed border-gold-400/60 bg-cream-50 p-4">
            <div className="flex items-center gap-2 text-gold-700">
              <Link2 className="h-4 w-4" />
              <span className="font-sans text-[11px] font-semibold uppercase tracking-widest">Link thiệp</span>
            </div>
            <p className="mt-2 break-all font-serif text-sm leading-relaxed text-espresso-300">
              {invitationUrl || "Link sẽ xuất hiện sau khi bạn nhập tên khách mời."}
            </p>
          </div>

          <button
            type="button"
            onClick={copyLink}
            disabled={!invitationUrl}
            className="flex w-full items-center justify-center gap-2 bg-espresso-500 px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-widest text-ivory-50 transition hover:bg-espresso-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Đã sao chép" : "Sao chép link"}
          </button>

          {invitationUrl && (
            <a
              href={invitationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 font-sans text-xs font-semibold uppercase tracking-widest text-gold-700"
            >
              Xem thử thiệp <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <Link href="/" className="mt-8 block text-center font-serif text-sm italic text-espresso-300 underline">
          Quay lại thiệp cưới
        </Link>
      </div>
    </main>
  );
}
