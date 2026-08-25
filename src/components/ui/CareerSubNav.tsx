"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";

const tabs = [
  { label: "Why Work With Us", href: "/career/why-work-with-us" },
  { label: "Current Openings", href: "/career/current-openings" },
  { label: "Employee Benefits", href: "/career/employee-benefits" },
];

export function CareerSubNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-[var(--color-border-soft)] bg-[var(--color-offwhite)]">
      <Container>
        <div className="flex items-center gap-8 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`whitespace-nowrap text-[12.5px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                  active
                    ? "text-[var(--color-brand)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}