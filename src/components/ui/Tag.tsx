export function Tag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-body)] ${className}`}
    >
      {children}
    </span>
  );
}
