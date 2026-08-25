import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import type { Footer as FooterGlobal } from "@/payload-types";


export function Footer({ footer }: { footer: FooterGlobal }) {
  return (
    <footer id="footer" className="bg-[var(--color-cream)]">
      <Container className="grid grid-cols-1 gap-12 border-t border-[var(--color-border)] py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src={images.logo_oneSISFooter}
              alt="SIS Logo"
              width={180}
              height={60}
              className="object-contain"
              priority
            />
          </Link>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-[var(--color-body)]">
            {footer.description}
          </p>
          <span className="mt-5 inline-flex border border-[var(--color-brand)]/30 bg-[var(--color-brand-tint)] px-3.5 py-2 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[var(--color-brand)]">
            {footer.badge}
          </span>
        </div>

        {(footer.columns ?? []).map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">
              {col.title}
            </h4>
            <ul className="mt-5 flex flex-col gap-3.5">
              {(col.links ?? []).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] text-[var(--color-body)] transition-colors hover:text-[var(--color-brand)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-[var(--color-border)]">
        <Container className="flex flex-col items-center gap-4 py-6 text-[12.5px] text-[var(--color-muted)] sm:flex-row sm:justify-between">
          <span>{footer.copyright}</span>
          <div className="flex items-center gap-6">
           {(footer.social ?? []).map((social) => (
  <a
    key={social.label}
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {social.label}
  </a>
))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
