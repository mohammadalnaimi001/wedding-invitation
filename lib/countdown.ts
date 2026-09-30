import { weddingStart, weddingEnd } from "./wedding-config";
export function countdownAt(now: number) {
  const start = weddingStart().getTime(),
    end = weddingEnd().getTime();
  if (now >= end) return { state: "finished" as const, values: [0, 0, 0, 0] };
  if (now >= start)
    return { state: "celebrating" as const, values: [0, 0, 0, 0] };
  const s = Math.max(0, Math.floor((start - now) / 1000));
  return {
    state: "waiting" as const,
    values: [
      Math.floor(s / 86400),
      Math.floor((s % 86400) / 3600),
      Math.floor((s % 3600) / 60),
      s % 60,
    ],
  };
}
