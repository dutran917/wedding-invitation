import { WeddingConfig } from "@/types/wedding";

const escapeCalendarText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");

export const downloadWeddingCalendar = (config: WeddingConfig) => {
  const compactDate = config.weddingDate.replaceAll("-", "");
  const [startHour, startMinute] = config.weddingTime.split(":").map(Number);
  const endHour = String((startHour + 4) % 24).padStart(2, "0");
  const startTime = `${String(startHour).padStart(2, "0")}${String(startMinute).padStart(2, "0")}00`;
  const endTime = `${endHour}${String(startMinute).padStart(2, "0")}00`;
  const title = `Lễ thành hôn ${config.groom.name} & ${config.bride.name}`;

  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//Wedding Invitation//VI",
    "BEGIN:VEVENT",
    `UID:${compactDate}-${config.groom.name}-${config.bride.name}@wedding-invitation`,
    `DTSTART;TZID=Asia/Ho_Chi_Minh:${compactDate}T${startTime}`,
    `DTEND;TZID=Asia/Ho_Chi_Minh:${compactDate}T${endTime}`,
    `SUMMARY:${escapeCalendarText(title)}`,
    `LOCATION:${escapeCalendarText(config.venue.address)}`,
    `DESCRIPTION:${escapeCalendarText(`Trân trọng kính mời bạn tới chung vui cùng ${config.groom.name} và ${config.bride.name}.`)}`,
    `URL:${config.venue.mapsUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `dam-cuoi-${config.groom.name}-${config.bride.name}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};
