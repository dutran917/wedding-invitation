import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { appendRsvpResponse } from "@/lib/server/rsvp-store";
import { AttendanceStatus, GuestSide, RsvpSubmission } from "@/types/rsvp";

export const dynamic = "force-dynamic";

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = cleanText(body.name, 100);
    const attending: AttendanceStatus = body.attending === "no" ? "no" : "yes";
    const side: GuestSide = ["groom", "bride", "both"].includes(body.side)
      ? body.side
      : "both";
    const guestCount = attending === "yes"
      ? Math.min(10, Math.max(1, Number.parseInt(String(body.guestCount), 10) || 1))
      : 0;

    if (!name) {
      return NextResponse.json({ error: "Vui lòng nhập họ và tên" }, { status: 400 });
    }

    const submission: RsvpSubmission = {
      name,
      phone: cleanText(body.phone, 30),
      attending,
      guestCount,
      side,
      wishes: cleanText(body.wishes, 500),
    };
    const response = {
      ...submission,
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
    };
    const storage = await appendRsvpResponse(response);
    return NextResponse.json({ ok: true, id: response.id, storage }, { status: 201 });
  } catch (error) {
    console.error("Unable to save RSVP", error);
    return NextResponse.json(
      { error: "Không thể lưu phản hồi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
