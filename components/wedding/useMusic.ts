"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { weddingConfig } from "@/lib/wedding-config";
export function useMusic() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const raf = useRef(0);
  const wanted = useRef(false);
  const generation = useRef(0);
  const [playing, setPlaying] = useState(false);
  const fade = useCallback((target: number, done?: () => void) => {
    cancelAnimationFrame(raf.current);
    const el = audio.current;
    if (!el) return;
    const from = el.volume;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 900, 1);
      el.volume = Math.max(0, Math.min(1, from + (target - from) * t));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else done?.();
    };
    raf.current = requestAnimationFrame(tick);
  }, []);
  const start = useCallback(async () => {
    if (!audio.current) {
      audio.current = new Audio(weddingConfig.audioPath);
      audio.current.loop = true;
      audio.current.volume = 0;
      audio.current.preload = "none";
    }
    wanted.current = true;
    const id = ++generation.current;
    try {
      await audio.current.play();
      if (id !== generation.current) return;
      setPlaying(true);
      fade(0.35);
    } catch {
      if (id !== generation.current) return;
      wanted.current = false;
      setPlaying(false);
      toast("تعذّر تشغيل الموسيقى. جرّب زر الصوت مرة أخرى.");
    }
  }, [fade]);
  const toggle = useCallback(() => {
    if (wanted.current) {
      wanted.current = false;
      generation.current++;
      setPlaying(false);
      fade(0, () => audio.current?.pause());
    } else void start();
  }, [fade, start]);
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf.current);
        audio.current?.pause();
      } else if (wanted.current && audio.current) {
        audio.current.volume = 0;
        void audio.current
          .play()
          .then(() => fade(0.35))
          .catch(() => {
            wanted.current = false;
            setPlaying(false);
          });
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf.current);
      generation.current++;
      audio.current?.pause();
    };
  }, [fade]);
  return { playing, start, toggle };
}
