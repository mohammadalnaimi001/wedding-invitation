"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Volume2 } from "lucide-react";
import { weddingConfig as c, formatDate } from "@/lib/wedding-config";
import { Botanical, Ornament, Particles } from "./Ornaments";
export function WeddingIntro({
  onStart,
  onComplete,
}: {
  onStart: () => void;
  onComplete: () => void;
}) {
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let active = true;
    const fallback = window.setTimeout(() => {
      if (active) setReady(true);
    }, 2500);
    void document.fonts.ready.then(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
      clearTimeout(fallback);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (ready) button.current?.focus({ preventScroll: true });
  }, [ready]);
  function open() {
    if (opening) return;
    setOpening(true);
    onStart();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    timer.current = setTimeout(onComplete, reduced ? 250 : 3100);
  }
  return (
    <section
      className={`intro ${ready ? "is-ready" : ""} ${opening ? "is-opening" : ""}`}
      aria-label={`دعوة زفاف ${c.groomShortName} و${c.brideName}`}
    >
      <Particles dark />
      <div className="intro-halo" />
      <div className="intro-frame" aria-hidden="true" />
      <div className="loading-monogram" aria-hidden={ready}>
        <span>A</span>
        <p>لحظة من الفرح</p>
      </div>
      <div className="intro-content" aria-hidden={!ready}>
        <div className="intro-heading">
          <span className="eyebrow">دعوةٌ من القلب</span>
          <h1>فرحتنا تحلو بوجودكم</h1>
          <Ornament />
        </div>
        <div className="envelope-scene" aria-hidden="true">
          <div className="envelope">
            <div className="envelope-back" />
            <div className="envelope-card">
              <Ornament />
              <span>
                {c.groomShortName} و{c.brideName}
              </span>
              <small>{formatDate(c.weddingDate)}</small>
            </div>
            <div className="envelope-face">
              <Botanical />
              <span className="envelope-date">
                {c.weddingDate.split("-").reverse().join(" · ")}
              </span>
            </div>
            <div className="envelope-flap" />
            <div className="wax-seal">
              <span dir="ltr">{c.monogram}</span>
            </div>
          </div>
        </div>
        <div className="intro-bottom">
          <button
            ref={button}
            onClick={open}
            className="button button-gold open-button"
            disabled={!ready || opening}
          >
            افتح الدعوة
            <ArrowLeft size={18} />
          </button>
          <p className="sound-hint">
            <Volume2 size={13} />
            للتجربة الأجمل، ارفع الصوت قليلًا
          </p>
          <span className="intro-names">
            {c.groomShortName} <i>و</i> {c.brideName}
          </span>
        </div>
      </div>
    </section>
  );
}
