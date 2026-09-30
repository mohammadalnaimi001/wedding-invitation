import type { CSSProperties } from "react";
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament ${className}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 72 32" fill="none">
        <path
          d="M36 3C25 8 24 20 36 29C48 20 47 8 36 3ZM36 8V25M28 17C17 3 7 10 10 19C12 26 22 25 28 17ZM44 17C55 3 65 10 62 19C60 26 50 25 44 17ZM10 19H2M62 19H70"
          stroke="currentColor"
          strokeWidth=".85"
        />
        <circle cx="36" cy="16" r="2" fill="currentColor" />
      </svg>
      <span />
    </div>
  );
}
export function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`botanical ${className}`}
      viewBox="0 0 160 320"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25 310C44 247 29 190 67 139C95 99 99 53 122 10"
        stroke="currentColor"
        strokeWidth="1"
      />
      {Array.from({ length: 10 }, (_, i) => (
        <g
          key={i}
          transform={`translate(${31 + i * 8.3} ${284 - i * 27}) rotate(${i % 2 ? -37 : 32})`}
        >
          <path
            d={
              i % 2
                ? "M0 0C-37-3-43-24-39-35C-15-32-4-16 0 0Z"
                : "M0 0C35-5 43-26 39-38C15-33 4-16 0 0Z"
            }
            stroke="currentColor"
            strokeWidth=".7"
            fill="currentColor"
            fillOpacity=".08"
          />
        </g>
      ))}
    </svg>
  );
}
export function Lantern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`lantern ${className}`}
      viewBox="0 0 100 250"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 0V62M43 62H57M36 77L50 65L64 77M30 85H70L79 154L50 182L21 154L30 85Z"
        stroke="currentColor"
      />
      <path
        d="M35 92H65L70 150L50 168L30 150L35 92Z"
        fill="currentColor"
        fillOpacity=".06"
        stroke="currentColor"
        strokeWidth=".6"
      />
      <path
        d="M50 92V168M30 150H70M50 182V193M44 194H56"
        stroke="currentColor"
        strokeWidth=".7"
      />
      <ellipse cx="50" cy="131" rx="13" ry="27" fill="#e6bb60" opacity=".13" />
      <path
        d="M50 114C38 131 47 142 50 142C61 136 52 129 50 114Z"
        fill="#efd591"
      />
    </svg>
  );
}
export function Particles({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`particles ${dark ? "particles-dark" : ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: 20 }, (_, i) => (
        <i
          key={i}
          style={
            {
              "--x": `${(i * 37 + 8) % 100}%`,
              "--y": `${(i * 23 + 12) % 100}%`,
              "--delay": `${(-i * 1.7).toFixed(1)}s`,
              "--duration": `${12 + (i % 6) * 3}s`,
              "--size": `${(i % 3) + 1}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
