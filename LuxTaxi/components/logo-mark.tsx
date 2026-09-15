export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Oslo Limousine"
    >
      <circle cx="32" cy="32" r="32" fill="#161412" />
      <circle cx="32" cy="32" r="29.8" stroke="#C9A227" strokeOpacity="0.9" strokeWidth="1.2" />
      <text
        x="32"
        y="34"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        fontStyle="italic"
        fontWeight="600"
        fontSize="30"
        letterSpacing="-2.5"
        fill="#E9CE7E"
      >
        OL
      </text>
    </svg>
  );
}
