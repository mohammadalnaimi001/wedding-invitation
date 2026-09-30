"use client";
import {
  CalendarPlus,
  Download,
  CalendarDays,
  Share2,
  Link2,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { calendarFile, googleCalendarUrl } from "@/lib/calendar";
import {
  weddingConfig,
  invitationTitle,
  invitationDescription,
} from "@/lib/wedding-config";
function downloadCalendar() {
  const blob = new Blob([calendarFile()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ahmad-wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10000);
  toast.success("تم تجهيز موعد الفرح للتقويم");
}
export function AddToCalendar() {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <button className="button button-outline">
          <CalendarPlus size={18} />
          أضف الموعد للتقويم
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="calendar-menu"
        align="center"
        sideOffset={10}
      >
        <DropdownMenuItem asChild>
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarDays />
            تقويم Google
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={downloadCalendar}>
          <Download />
          تقويم Apple / ملف ICS
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function ShareButton({ compact = false }: { compact?: boolean }) {
  async function share() {
    const url =
      weddingConfig.siteUrl || `${location.origin}${location.pathname}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: invitationTitle,
          text: invitationDescription,
          url,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("تم نسخ رابط الدعوة، شاركه مع أحبابك");
    } catch {
      toast("رابط الدعوة", {
        description: url,
        duration: 12000,
        action: {
          label: "افتح الرابط",
          onClick: () => window.open(url, "_blank", "noopener,noreferrer"),
        },
      });
    }
  }
  return (
    <button
      onClick={share}
      className={compact ? "icon-button" : "button button-outline"}
      aria-label="مشاركة الدعوة"
    >
      <Share2 size={compact ? 19 : 17} />
      {!compact && "مشاركة الدعوة"}
    </button>
  );
}
export function WhatsAppLink() {
  const text = `${invitationTitle}\n${invitationDescription}\n${weddingConfig.siteUrl}`;
  return (
    <a
      className="text-link"
      href={`https://wa.me/?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Link2 size={15} />
      مشاركة عبر واتساب
    </a>
  );
}
