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

      {/* Stretch-limousine silhouette: long, low cabin over a long, low body */}
      <rect x="14" y="29" width="36" height="10" rx="4.5" fill="#C9A227" />
      <rect x="6" y="34" width="52" height="11" rx="5.5" fill="#C9A227" />

      {/* Window band */}
      <rect x="18" y="31.2" width="28" height="5.6" rx="2.4" fill="#161412" />
      <rect x="27.4" y="31.2" width="1.3" height="5.6" fill="#161412" />
      <rect x="35.4" y="31.2" width="1.3" height="5.6" fill="#161412" />

      {/* Wheels */}
      <circle cx="18" cy="45" r="5.2" fill="#161412" stroke="#C9A227" strokeWidth="1.4" />
      <circle cx="46" cy="45" r="5.2" fill="#161412" stroke="#C9A227" strokeWidth="1.4" />
      <circle cx="18" cy="45" r="1.7" fill="#C9A227" />
      <circle cx="46" cy="45" r="1.7" fill="#C9A227" />
    </svg>
  );
}
