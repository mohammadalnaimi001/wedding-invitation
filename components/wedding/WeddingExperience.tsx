"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { weddingConfig as c, formatDate } from "@/lib/wedding-config";
import { ShareButton } from "./InvitationActions";
import { WeddingIntro } from "./WeddingIntro";
import { useMusic } from "./useMusic";
import {
  QuranSection,
  InvitationSection,
  WeddingDetails,
  ArtistSection,
  LocationSection,
  HennaSection,
  PrivacyNotice,
  GroomZaffaSection,
  ClosingSection,
} from "./Sections";
export function WeddingExperience() {
  const [opened, setOpened] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const { playing, start, toggle } = useMusic();
  useEffect(() => {
    document.documentElement.classList.toggle("invitation-locked", !opened);
    if (opened) {
      window.scrollTo(0, 0);
      document
        .getElementById("invitation-start")
        ?.focus({ preventScroll: true });
    }
    return () => document.documentElement.classList.remove("invitation-locked");
  }, [opened]);
  useEffect(() => {
    if (!opened) return;
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px 12px 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = height > 0 ? window.scrollY / height : 0;
      if (progress.current)
        progress.current.style.transform = `scaleX(${ratio})`;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    const visibility = () =>
      document.documentElement.classList.toggle("page-hidden", document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      document.removeEventListener("visibilitychange", visibility);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("page-hidden");
    };
  }, [opened]);
  return (
    <>
      <div
        className={`site ${opened ? "is-entered" : ""}`}
        inert={!opened}
        aria-hidden={!opened}
      >
        <a href="#invitation" className="skip-link">
          انتقل إلى الدعوة
        </a>
        <header className="site-header">
          <a
            href="#invitation"
            className="monogram"
            dir="ltr"
            aria-label="دعوة أحمد وأميرته"
          >
            {c.monogram}
          </a>
          <nav aria-label="أقسام الدعوة">
            <a href="#invitation">الدعوة</a>
            <a href="#details">الموعد</a>
            <a href="#location">الموقع</a>
            <a href="#henna">ليلة الحناء</a>
          </nav>
          <span className="header-date">{formatDate(c.weddingDate)}</span>
          <div className="header-actions">
            <button
              className={`icon-button music-toggle ${playing ? "music-playing" : ""}`}
              onClick={toggle}
              aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
              aria-pressed={playing}
            >
              {playing ? <Volume2 size={19} /> : <VolumeX size={19} />}
            </button>
            <ShareButton compact />
          </div>
          <div className="scroll-progress" ref={progress} />
        </header>
        <main>
          <QuranSection />
          <InvitationSection />
          <WeddingDetails />
          <ArtistSection />
          <LocationSection />
          <HennaSection />
          <PrivacyNotice />
          <GroomZaffaSection />
        </main>
        <ClosingSection />
      </div>
      {!opened && (
        <WeddingIntro
          onStart={() => void start()}
          onComplete={() => setOpened(true)}
        />
      )}
      <Toaster
        theme="light"
        dir="rtl"
        position="bottom-center"
        toastOptions={{
          style: {
            fontFamily: "'Noto Sans Arabic',sans-serif",
            background: "#fffaf0",
            color: "#173e34",
            border: "1px solid #d5c59d",
          },
        }}
      />
    </>
  );
}
