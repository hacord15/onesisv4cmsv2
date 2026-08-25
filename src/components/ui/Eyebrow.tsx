export function Eyebrow({
  children,
  dash = false,
  inverse = false,
  className = "",
}: {
  children: React.ReactNode;
  dash?: boolean;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {dash && (
        <span
          className={`h-px w-8 shrink-0 ${
            inverse ? "bg-[var(--color-brand)]" : "bg-[var(--color-brand)]"
          }`}
        />
      )}
      <span className="eyebrow">{children}</span>
    </div>
  );
}
