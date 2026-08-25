export function TextLink({
  children,
  href = "#",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)] ${className}`}
    >
      {children}
      <svg
        width="13"
        height="13"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
      >
        <path
          d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
