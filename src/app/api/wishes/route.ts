import { NextResponse } from "next/server";
import { listRsvpResponses } from "@/lib/server/rsvp-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { responses } = await listRsvpResponses();
    const wishes = responses
      .filter((response) => response.wishes.trim())
      .slice(0, 6)
      .map((response) => ({
        id: response.id,
        name: response.name,
        message: response.wishes,
        createdAt: response.submittedAt,
      }));

    return NextResponse.json(
      { wishes },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    console.error("Unable to load guest wishes", error);
    return NextResponse.json({ error: "Không thể tải lời chúc" }, { status: 500 });
  }
}
