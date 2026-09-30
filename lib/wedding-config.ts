/** جميع معلومات الدعوة القابلة للتعديل في مكان واحد. الأوقات بتوقيت عمّان. */
export const weddingConfig = {
  monogram: "A & M",
  groomName: "أحمد بسام البنا",
  groomShortName: "أحمد",
  groomFather: "بسام صالح البنا",
  brideName: "أميرته",
  brideFather: "كمال حسن زبن",
  weddingDate: "2026-10-16",
  weddingStartTime: "20:30",
  weddingEndTime: "23:30",
  timeZone: "Asia/Amman",
  utcOffset: "+03:00",
  venueName: "قاعات ليلتي",
  venueAddress: "شارع الحرية، عمّان",
  mapsUrl: "https://maps.app.goo.gl/g547C1gF8vXVbE4o7",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=31.8997185,35.8951999&z=16&output=embed",
  artistName: "يوسف الشيخ",
  hennaDate: "2026-10-13",
  hennaLocation: "ديوان الملكاوي – طبربور",
  hennaMapsUrl: "https://maps.app.goo.gl/NQp5r6fTLGca6TH77",
  groomZaffaTime: "17:00",
  groomZaffaMapsUrl: "https://maps.app.goo.gl/ifN6oBthTRyzLidG7",
  photoNotice:
    "نرجو الالتزام بعدم التصوير داخل قاعة النساء، شاكرين لكم حسن تعاونكم.",
  audioPath: "/audio/wedding.mp3",
  siteUrl: "https://ahmad-amirateh-wedding.mohmmadkazali3.chatgpt.site",
} as const;

export function weddingStart() {
  return new Date(
    `${weddingConfig.weddingDate}T${weddingConfig.weddingStartTime}:00${weddingConfig.utcOffset}`,
  );
}
export function weddingEnd() {
  const end = new Date(
    `${weddingConfig.weddingDate}T${weddingConfig.weddingEndTime}:00${weddingConfig.utcOffset}`,
  );
  if (end <= weddingStart()) end.setDate(end.getDate() + 1);
  return end;
}
export function formatDate(
  value: string,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
) {
  return new Intl.DateTimeFormat("ar-EG", {
    ...options,
    timeZone: weddingConfig.timeZone,
  }).format(new Date(`${value}T12:00:00${weddingConfig.utcOffset}`));
}
export function formatTime(value: string) {
  const [h, m] = value.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")}`;
}
export const invitationTitle = `دعوة زفاف ${weddingConfig.groomShortName} و${weddingConfig.brideName}`;
export const invitationDescription = `وبحضوركم تكتمل فرحتنا. ${formatDate(weddingConfig.weddingDate)}، ${weddingConfig.venueName} – ${weddingConfig.venueAddress}.`;
