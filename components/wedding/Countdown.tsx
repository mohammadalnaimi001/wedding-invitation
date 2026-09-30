"use client";
import { useEffect, useState } from "react";
import { countdownAt } from "@/lib/countdown";
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    const update = () => setNow(Date.now());
    const visibility = () => {
      if (timer) clearInterval(timer);
      if (!document.hidden) {
        update();
        timer = setInterval(update, 1000);
      }
    };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const result = now === null ? null : countdownAt(now);
  return (
    <div className="countdown-block" data-reveal>
      <p className="eyebrow">نعدّ اللحظات حتى نلقاكم</p>
      {result?.state === "celebrating" ? (
        <p className="event-message">اليوم ليلتنا 🤍</p>
      ) : result?.state === "finished" ? (
        <p className="event-message">دامت الأفراح في دياركم</p>
      ) : (
        <div
          className="countdown"
          role="timer"
          aria-label="الوقت المتبقي حتى حفل الزفاف"
        >
          {["يوم", "ساعة", "دقيقة", "ثانية"].map((label, i) => (
            <div className="count-unit" key={label}>
              <span className="count-number" suppressHydrationWarning>
                {result ? String(result.values[i]).padStart(2, "0") : "—"}
              </span>
              <span className="count-label">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
