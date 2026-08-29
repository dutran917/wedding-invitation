"use client";

import React, { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Download,
  Heart,
  Loader2,
  LockKeyhole,
  LogOut,
  MessageCircleHeart,
  RefreshCcw,
  Search,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { RsvpResponse } from "@/types/rsvp";

type Filter = "all" | "yes" | "no" | "wishes";

const formatSubmittedAt = (value: string) =>
  new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));

const sideLabel: Record<RsvpResponse["side"], string> = {
  both: "Khách chung",
  groom: "Nhà trai",
  bride: "Nhà gái",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [responses, setResponses] = useState<RsvpResponse[]>([]);
  const [storage, setStorage] = useState<"local-file" | "google-sheets">("local-file");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const loadResponses = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await fetch("/api/admin/responses", { cache: "no-store" });
      if (result.status === 401) {
        setIsAuthenticated(false);
        setResponses([]);
        return;
      }
      const payload = await result.json();
      if (!result.ok) throw new Error(payload.error || "Không thể tải phản hồi");
      setResponses(payload.responses || []);
      setStorage(payload.storage || "local-file");
      setIsAuthenticated(true);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không thể tải phản hồi");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadResponses();
  }, [loadResponses]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = await result.json();
      if (!result.ok) throw new Error(payload.error || "Không thể đăng nhập");
      setPassword("");
      await loadResponses();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không thể đăng nhập");
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setResponses([]);
    setIsAuthenticated(false);
  };

  const stats = useMemo(() => {
    const attending = responses.filter((item) => item.attending === "yes");
    return {
      responses: responses.length,
      attending: attending.length,
      guests: attending.reduce((total, item) => total + item.guestCount, 0),
      declined: responses.filter((item) => item.attending === "no").length,
      wishes: responses.filter((item) => item.wishes).length,
    };
  }, [responses]);

  const filteredResponses = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("vi");
    return responses.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "wishes" ? Boolean(item.wishes) : item.attending === filter);
      const matchesSearch =
        !normalizedSearch ||
        item.name.toLocaleLowerCase("vi").includes(normalizedSearch) ||
        item.phone.includes(normalizedSearch);
      return matchesFilter && matchesSearch;
    });
  }, [filter, responses, search]);

  const exportCsv = () => {
    const quote = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
    const rows = [
      ["Thời gian", "Họ tên", "Số điện thoại", "Tham dự", "Số người", "Phía", "Lời chúc"],
      ...responses.map((item) => [
        formatSubmittedAt(item.submittedAt),
        item.name,
        item.phone,
        item.attending === "yes" ? "Có" : "Không",
        item.guestCount,
        sideLabel[item.side],
        item.wishes,
      ]),
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(quote).join(",")).join("\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `phan-hoi-cuoi-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (isAuthenticated === null || (isLoading && isAuthenticated !== false)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#181513] text-gold-300">
        <Loader2 className="h-7 w-7 animate-spin" aria-label="Đang tải" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#181513] px-4 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md border border-gold-400/35 bg-ivory-50 p-7 text-center shadow-2xl sm:p-10"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/50 bg-cream-50 text-gold-700">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <p className="mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700">
            Khu vực riêng tư
          </p>
          <h1 className="mt-2 font-serif text-4xl text-espresso-500">Quản lý phản hồi</h1>
          <p className="mt-3 font-serif text-base italic text-espresso-300">
            Dành riêng cho Quốc Du & Phương Ly
          </p>
          <label className="mt-8 block text-left">
            <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-widest text-espresso-300">
              Mật khẩu
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoFocus
              placeholder="Nhập mật khẩu quản lý"
              className="w-full border border-gold-300/60 bg-white px-4 py-3.5 font-serif text-base text-espresso-500 outline-none focus:border-gold-600"
            />
          </label>
          {error && <p className="mt-3 text-left font-sans text-xs text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 flex w-full items-center justify-center gap-2 bg-espresso-500 px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-widest text-ivory-50 disabled:opacity-50"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Đăng nhập
          </button>
        </form>
      </main>
    );
  }

  const statCards = [
    { label: "Phản hồi", value: stats.responses, icon: Users },
    { label: "Sẽ tham dự", value: stats.attending, icon: UserCheck },
    { label: "Tổng khách", value: stats.guests, icon: Heart },
    { label: "Không tham dự", value: stats.declined, icon: UserX },
    { label: "Lời chúc", value: stats.wishes, icon: MessageCircleHeart },
  ];

  return (
    <main className="min-h-screen bg-[#F4EFE6] text-espresso-500">
      <header className="border-b border-gold-300/35 bg-[#211C18] px-4 py-5 text-ivory-50 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300">Wedding dashboard</p>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl">Quốc Du & Phương Ly</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-ivory-200">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-700">Tổng quan</p>
            <h2 className="mt-1 font-serif text-3xl">Phản hồi tham dự</h2>
            <p className="mt-1 font-serif text-sm italic text-espresso-300">
              Nguồn dữ liệu: {storage === "google-sheets" ? "Google Sheets" : "File local"}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadResponses} className="flex items-center gap-2 border border-gold-400/50 bg-ivory-50 px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-widest">
              <RefreshCcw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} /> Làm mới
            </button>
            <button onClick={exportCsv} disabled={!responses.length} className="flex items-center gap-2 bg-espresso-500 px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-widest text-ivory-50 disabled:opacity-40">
              <Download className="h-3.5 w-3.5" /> Xuất CSV
            </button>
          </div>
        </div>

        <section className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {statCards.map(({ label, value, icon: Icon }) => (
            <article key={label} className="border border-gold-300/35 bg-ivory-50 p-4 shadow-sm sm:p-5">
              <Icon className="h-5 w-5 text-gold-700" />
              <strong className="mt-4 block font-serif text-3xl font-medium">{value}</strong>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-espresso-200">{label}</span>
            </article>
          ))}
        </section>

        <section className="mt-7 border border-gold-300/35 bg-ivory-50 shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gold-300/30 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {(["all", "yes", "no", "wishes"] as Filter[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-widest ${filter === item ? "bg-espresso-500 text-ivory-50" : "border border-gold-300/40 text-espresso-300"}`}
                >
                  {item === "all" ? "Tất cả" : item === "yes" ? "Tham dự" : item === "no" ? "Vắng mặt" : "Có lời chúc"}
                </button>
              ))}
            </div>
            <label className="relative block md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-700" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm tên hoặc số điện thoại"
                className="w-full border border-gold-300/50 bg-white py-2.5 pl-9 pr-3 font-serif text-sm outline-none focus:border-gold-600"
              />
            </label>
          </div>

          {error && <p className="border-b border-red-200 bg-red-50 px-4 py-3 font-sans text-xs text-red-700">{error}</p>}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead className="bg-cream-50 font-sans text-[10px] uppercase tracking-widest text-espresso-300">
                <tr>
                  <th className="px-4 py-3">Khách mời</th><th className="px-4 py-3">Tham dự</th><th className="px-4 py-3">Số người</th><th className="px-4 py-3">Phía</th><th className="px-4 py-3">Lời chúc</th><th className="px-4 py-3">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-300/25">
                {filteredResponses.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-cream-50/60">
                    <td className="px-4 py-4"><strong className="block font-serif text-base">{item.name}</strong><span className="font-sans text-xs text-espresso-200">{item.phone || "Không có SĐT"}</span></td>
                    <td className="px-4 py-4"><span className={`inline-flex px-2 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider ${item.attending === "yes" ? "bg-emerald-50 text-emerald-800" : "bg-stone-100 text-stone-600"}`}>{item.attending === "yes" ? "Có" : "Không"}</span></td>
                    <td className="px-4 py-4 font-serif text-base">{item.guestCount}</td>
                    <td className="px-4 py-4 font-serif text-sm">{sideLabel[item.side]}</td>
                    <td className="max-w-sm px-4 py-4 font-serif text-sm italic leading-relaxed text-espresso-300">{item.wishes || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-4 font-sans text-xs text-espresso-200">{formatSubmittedAt(item.submittedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-gold-300/25 md:hidden">
            {filteredResponses.map((item) => (
              <article key={item.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div><h3 className="font-serif text-xl">{item.name}</h3><p className="font-sans text-xs text-espresso-200">{item.phone || "Không có SĐT"}</p></div>
                  <span className={`px-2 py-1 font-sans text-[10px] font-semibold uppercase ${item.attending === "yes" ? "bg-emerald-50 text-emerald-800" : "bg-stone-100 text-stone-600"}`}>{item.attending === "yes" ? `${item.guestCount} khách` : "Vắng mặt"}</span>
                </div>
                <p className="mt-3 font-sans text-[10px] font-semibold uppercase tracking-widest text-gold-700">{sideLabel[item.side]} · {formatSubmittedAt(item.submittedAt)}</p>
                {item.wishes && <p className="mt-3 border-l-2 border-gold-400/50 pl-3 font-serif text-base italic leading-relaxed text-espresso-300">“{item.wishes}”</p>}
              </article>
            ))}
          </div>

          {!filteredResponses.length && !isLoading && (
            <div className="px-5 py-14 text-center"><MessageCircleHeart className="mx-auto h-7 w-7 text-gold-500" /><p className="mt-3 font-serif text-lg italic text-espresso-300">Chưa có phản hồi phù hợp.</p></div>
          )}
        </section>
      </div>
    </main>
  );
}
