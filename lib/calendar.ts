import {
  weddingConfig as c,
  weddingStart,
  weddingEnd,
  invitationTitle,
} from "./wedding-config";
function stamp(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}
function escape(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
function fold(line: string) {
  const encoder = new TextEncoder();
  let result = "",
    size = 0;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    if (size + bytes > 74) {
      result += "\r\n ";
      size = 1;
    }
    result += char;
    size += bytes;
  }
  return result;
}
export function calendarFile(now = new Date()) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ahmad Wedding//Arabic Invitation//AR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:ahmad-wedding-${c.weddingDate}@invitation.local`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${stamp(weddingStart())}`,
    `DTEND:${stamp(weddingEnd())}`,
    `SUMMARY:${escape(invitationTitle)}`,
    `LOCATION:${escape(`${c.venueName} – ${c.venueAddress}`)}`,
    `DESCRIPTION:${escape(`وبحضوركم تكتمل فرحتنا\n${c.mapsUrl}`)}`,
    `URL:${c.mapsUrl}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}
export function googleCalendarUrl() {
  return (
    "https://calendar.google.com/calendar/render?" +
    new URLSearchParams({
      action: "TEMPLATE",
      text: invitationTitle,
      dates: `${stamp(weddingStart())}/${stamp(weddingEnd())}`,
      ctz: c.timeZone,
      details: `وبحضوركم تكتمل فرحتنا\n${c.mapsUrl}`,
      location: `${c.venueName} – ${c.venueAddress}`,
    }).toString()
  );
}
