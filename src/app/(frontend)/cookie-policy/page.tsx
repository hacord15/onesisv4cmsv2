import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getGlobal } from "@/lib/payload-fetch";
import { images } from "@/lib/images";

export const metadata = {
  title: "Cookie Policy | OneSIS",
  description: "How OneSIS uses cookies and similar technologies on this website.",
};

const LAST_UPDATED = "September 26, 2026";

const cookieTypes = [
  {
    type: "Strictly Necessary",
    required: true,
    description:
      "Required for the website to function — such as remembering form submissions in progress or maintaining basic site security. These cannot be switched off.",
  },
  {
    type: "Functional",
    required: false,
    description:
      "Remember choices you make (such as region or display preferences) to provide a more personalized experience on return visits.",
  },
  {
    type: "Analytics",
    required: false,
    description:
      "Help us understand how visitors use the site — which pages are viewed, how long visitors stay, and where they navigate from — so we can improve content and usability.",
  },
];

const sections = [
  {
    title: "1. What Are Cookies?",
    body: [
      "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, as well as to provide information to the site owner. Similar technologies, such as web beacons and local storage, may be used for the same purposes and are covered by this policy.",
    ],
  },
  {
    title: "2. How We Use Cookies",
    body: [
      "We use cookies on this website for the following purposes:",
    ],
    list: [
      "To ensure core website functionality, such as page navigation and form submission",
      "To remember your preferences across visits",
      "To understand how visitors interact with our website, so we can improve content and performance",
      "To measure the effectiveness of our website in communicating our services",
    ],
  },
  {
    title: "3. Types of Cookies We Use",
    isTable: true,
  },
  {
    title: "4. Third-Party Cookies",
    body: [
      "Some cookies on our website may be set by third-party services we use, such as analytics providers. These third parties may use cookies, web beacons, and similar technologies to collect information about your use of our website and other websites. We do not control the operation of these third-party cookies and encourage you to review the relevant third party's own privacy and cookie policies.",
    ],
  },
  {
    title: "5. Managing Cookies",
    body: [
      "Most web browsers allow you to control cookies through their settings — including blocking cookies entirely, deleting existing cookies, or being notified when a cookie is set. Since the way to manage cookies varies by browser, please check your browser's help menu for specific instructions.",
      "Please note that disabling certain cookies, particularly strictly necessary ones, may affect the functionality of this website.",
    ],
    links: [
      { label: "Google Chrome", href: "https://support.google.com/chrome/answer/95647" },
      { label: "Mozilla Firefox", href: "https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" },
      { label: "Safari", href: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" },
      { label: "Microsoft Edge", href: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
    ],
  },
  {
    title: "6. Changes to This Policy",
    body: [
      `We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. The "Last Updated" date at the top of this page indicates when it was last revised.`,
    ],
  },
  {
    title: "7. Contact Us",
    body: [
      "If you have questions about our use of cookies, please contact us:",
    ],
    list: [
      "Email: Onesis@sisindia.com",
      "Phone: +91 011 4646 4444",
    ],
  },
];

export default async function CookiePolicyPage() {
  const [nav, footer] = await Promise.all([getGlobal("nav"), getGlobal("footer")]);

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow="Legal"
          heading={<span className="accent">Cookie Policy</span>}
          description={`Last updated: ${LAST_UPDATED}`}
           backgroundImage={images.currentopeningsBanner}
        />

        <section className="py-16">
          <Container className="max-w-3xl">
            <div className="flex flex-col gap-12">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-[1.4rem] text-[var(--color-ink)]">
                    {section.title}
                  </h2>

                  {section.isTable ? (
                    <div className="mt-5 flex flex-col gap-4">
                      {cookieTypes.map((c) => (
                        <div
                          key={c.type}
                          className="border border-[var(--color-border)] p-5"
                        >
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-[14.5px] font-semibold text-[var(--color-ink)]">
                              {c.type}
                            </h3>
                            <span
                              className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] ${
                                c.required
                                  ? "bg-[var(--color-brand-tint)] text-[var(--color-brand)]"
                                  : "bg-[var(--color-cream)] text-[var(--color-muted)]"
                              }`}
                            >
                              {c.required ? "Always Active" : "Optional"}
                            </span>
                          </div>
                          <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                            {c.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col gap-4">
                      {section.body?.map((para, i) => (
                        <p
                          key={i}
                          className="text-[14.5px] leading-relaxed text-[var(--color-body)]"
                        >
                          {para}
                        </p>
                      ))}
                      {section.list && (
                        <ul className="flex flex-col gap-2.5">
                          {section.list.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[var(--color-body)]"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.links && (
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          {section.links.map((link) => (
                           <a 
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[13.5px] font-semibold text-[var(--color-brand)] hover:underline"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}