import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  icon?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 whitespace-nowrap";

const variants: Record<string, string> = {
  primary:
    "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)]",
  outline:
    "border border-[var(--color-ink)]/25 text-[var(--color-ink)] hover:border-[var(--color-ink)] bg-transparent",
  ghost:
    "text-[var(--color-ink)] underline underline-offset-4 decoration-[var(--color-ink)]/30 hover:decoration-[var(--color-ink)] normal-case tracking-normal font-medium text-[15px] px-0 py-0",
};

export function Button({
  children,
  href = "#",
  variant = "primary",
  className = "",
  icon = false,
}: ButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {icon && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0"
        >
          <path
            d="M3.5 12.5L12.5 3.5M12.5 3.5H5M12.5 3.5V11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
}
