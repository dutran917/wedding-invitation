import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/server/admin-auth";
import { listRsvpResponses } from "@/lib/server/rsvp-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
    if (!verifyAdminSession(session)) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const result = await listRsvpResponses();
    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("Unable to list RSVP responses", error);
    return NextResponse.json({ error: "Không thể tải phản hồi" }, { status: 500 });
  }
}
