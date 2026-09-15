import { useId } from "react";

export function LogoMark({ className }: { className?: string }) {
  const uid = useId();
  const goldId = `logoGold-${uid}`;
  const bodyId = `logoBody-${uid}`;
  const shadowId = `logoShadow-${uid}`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Oslo Limousine"
    >
      <defs>
        <linearGradient id={goldId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1D98A" />
          <stop offset="45%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8C6C16" />
        </linearGradient>
        <radialGradient id={bodyId} cx="35%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#2A2420" />
          <stop offset="100%" stopColor="#161412" />
        </radialGradient>
        <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.1" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      <circle cx="32" cy="32" r="32" fill={`url(#${bodyId})`} />
      <circle cx="32" cy="32" r="29.8" stroke={`url(#${goldId})`} strokeOpacity="0.9" strokeWidth="1.2" />

      <g transform="translate(32,33) scale(2.05) translate(-12,-12)" filter={`url(#${shadowId})`}>
        <g stroke={`url(#${goldId})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <path d="M9 17h6" />
        </g>
        <circle cx="7" cy="17" r="2.1" fill="#161412" stroke={`url(#${goldId})`} strokeWidth="1.3" />
        <circle cx="17" cy="17" r="2.1" fill="#161412" stroke={`url(#${goldId})`} strokeWidth="1.3" />
        <circle cx="7" cy="17" r="0.7" fill="#C9A227" />
        <circle cx="17" cy="17" r="0.7" fill="#C9A227" />
        {/* windshield highlight */}
        <path d="M13.2 8.6 L15.7 10.6" stroke="#F1D98A" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
      </g>
    </svg>
  );
}
