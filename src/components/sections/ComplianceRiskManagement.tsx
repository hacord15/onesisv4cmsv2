import { ShieldCheck, AlertTriangle, ClipboardCheck, Eye } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/images";

// Static section — intentionally NOT wired into the admin CMS. Edit the
// copy directly here. Drop your laptop/dashboard banner image at the path
// below (or change BANNER_IMAGE to wherever you place it).

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Ensure Compliance",
    description: "Adhere to statutory requirements and industry regulations.",
  },
  {
    icon: AlertTriangle,
    title: "Reduce Risks",
    description: "Identify and mitigate risks before they impact operations.",
  },
  {
    icon: ClipboardCheck,
    title: "Strengthen Governance",
    description: "Implement controls, audits and policies for strong governance.",
  },
  {
    icon: Eye,
    title: "Continuous Monitoring",
    description: "Track compliance status and incidents in real time, year-round.",
  },
];

const STATS = [
  { value: "98.6%", label: "Audit Pass Rate" },
  { value: "24/7", label: "Active Monitoring" },
  { value: "0", label: "Critical Incidents" },
];

export function ComplianceRiskManagement() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)]">
      {/* Banner */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images.complianceBanner})` }}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <Container className="relative z-10">
          <div className="grid gap-12 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-32">
            {/* Left: copy */}
            <div className="max-w-xl">
              <p className="eyebrow text-white/80 tracking-[0.2em]">
                Compliance &amp; Risk Management
              </p>
              <span className="mt-3 block h-[3px] w-14 bg-[var(--color-brand)]" />

              <h2 className="mt-7 font-display text-[2.5rem] leading-[1.12] text-white sm:text-[3rem]">
                Stay Compliant.
                <br />
                Operate with <span className="accent">Confidence.</span>
              </h2>

              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/85">
                Proactive compliance, risk management and governance frameworks
                that protect your business and strengthen operational resilience.
              </p>

              {/* <Button href="#" icon className="mt-9">
                Learn More
              </Button> */}
            </div>

            {/* Right: floating live-status HUD panel */}
            {/* <div className="lg:pb-2">
              <div className="ml-auto w-full max-w-sm rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                    Live Compliance Status
                  </span>
                </div>

                <div className="mt-5 divide-y divide-white/10">
                  {STATS.map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between py-3 first:pt-0 last:pb-0">
                      <span className="font-mono text-2xl font-semibold text-white">{s.value}</span>
                      <span className="text-right text-[11.5px] uppercase tracking-wide text-white/55">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </Container>
      </div>

      {/* Framework pillars — numbered ledger strip */}
      <div className="border-t border-white/10 bg-white">
        <Container className="py-4">
          {/* <p className="px-1 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-body)]/60">
            Compliance Framework — Four Pillars
          </p> */}
          <div className="grid divide-y divide-[var(--color-border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="group relative flex flex-col gap-4 px-6 py-10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[var(--color-brand)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-[var(--color-border)]" />
                  <Icon
                    size={20}
                    className="text-[var(--color-brand)] transition-transform duration-300 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[var(--color-ink)]">{title}</h3>
                  <p className="mt-2 max-w-[220px] text-[13.5px] leading-relaxed text-[var(--color-body)]">
                    {description}
                  </p>
                </div>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--color-brand)] transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}