import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { RsvpResponse } from "@/types/rsvp";

const DATA_DIRECTORY = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIRECTORY, "rsvps.json");
let writeQueue: Promise<void> = Promise.resolve();

const readLocalResponses = async (): Promise<RsvpResponse[]> => {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as RsvpResponse[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
};

const callGoogleSheets = async (action: "append" | "list", response?: RsvpResponse) => {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const sharedSecret = process.env.GOOGLE_SHEETS_SHARED_SECRET;
  if (!webhookUrl || !sharedSecret) return null;

  const result = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, secret: sharedSecret, response }),
    cache: "no-store",
  });

  if (!result.ok) throw new Error(`Google Sheets request failed: ${result.status}`);
  const payload = await result.json();
  if (!payload.ok) throw new Error(payload.error || "Google Sheets request failed");
  return payload;
};

export const appendRsvpResponse = async (response: RsvpResponse) => {
  const sheetsResult = await callGoogleSheets("append", response);
  if (sheetsResult) return "google-sheets" as const;

  writeQueue = writeQueue.then(async () => {
    await mkdir(DATA_DIRECTORY, { recursive: true });
    const current = await readLocalResponses();
    await writeFile(DATA_FILE, JSON.stringify([response, ...current], null, 2), "utf8");
  });
  await writeQueue;
  return "local-file" as const;
};

export const listRsvpResponses = async () => {
  const sheetsResult = await callGoogleSheets("list");
  if (sheetsResult) {
    return {
      responses: (sheetsResult.responses || []) as RsvpResponse[],
      storage: "google-sheets" as const,
    };
  }

  return { responses: await readLocalResponses(), storage: "local-file" as const };
};
