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
      <circle cx="32" cy="32" r="32" fill="#34463B" />
      <circle cx="32" cy="32" r="29.8" stroke="#B4903F" strokeOpacity="0.9" strokeWidth="1.2" />
      <circle cx="24" cy="32" r="11" stroke="#B4903F" strokeWidth="6" />
      <path d="M34 20H40V38H50V44H34V20Z" fill="#B4903F" />
    </svg>
  );
}
