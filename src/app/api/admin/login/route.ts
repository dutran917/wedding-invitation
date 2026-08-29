import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  verifyAdminPassword,
} from "@/lib/server/admin-auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (typeof password !== "string" || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Mật khẩu không đúng" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(), {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });
    return response;
  } catch (error) {
    console.error("Unable to create admin session", error);
    return NextResponse.json({ error: "Trang quản lý chưa được cấu hình" }, { status: 500 });
  }
}
