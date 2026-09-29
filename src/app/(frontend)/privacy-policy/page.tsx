import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getGlobal } from "@/lib/payload-fetch";
import { images } from "@/lib/images";

export const metadata = {
  title: "Privacy Policy | OneSIS",
  description: "How OneSIS collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "September 26, 2026";

const sections = [
  {
    title: "1. Introduction",
    body: [
      "OneSIS (\"we\", \"us\", \"our\"), a SIS Group company, is committed to protecting the privacy of visitors to our website, clients, employees, partners, and job applicants. This Privacy Policy explains what personal information we collect, how we use it, who we share it with, and the choices you have regarding your information.",
      "By using our website or engaging our services, you agree to the practices described in this policy. If you do not agree, please do not use our website or services.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "We may collect the following categories of information:",
    ],
    list: [
      "Contact details — name, email address, phone number, company name, and job title, submitted through our Contact, Partnership, or Careers forms.",
      "Enquiry details — the service, industry, city, and message content you provide when submitting a general or partnership enquiry.",
      "Application details — resume/CV, work history, and other information you submit when applying for a role via our Careers page.",
      "Usage data — pages visited, time spent on the site, browser type, device information, and general location, collected automatically via cookies and analytics tools.",
      "Communications — records of correspondence if you contact us by email, phone, or through the website.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    body: ["We use the information we collect to:"],
    list: [
      "Respond to enquiries and provide requested information about our services",
      "Evaluate partnership applications and job applications",
      "Deliver and manage facility management services for existing clients",
      "Improve our website, services, and customer experience",
      "Send updates about our services, unless you have opted out",
      "Comply with legal, regulatory, and contractual obligations",
    ],
  },
  {
    title: "4. How We Share Your Information",
    body: [
      "We do not sell your personal information. We may share information with:",
    ],
    list: [
      "Group companies within SIS Group, where necessary to deliver services or evaluate an enquiry",
      "Service providers who support our operations (e.g. IT hosting, email delivery), under confidentiality obligations",
      "Regulatory or government authorities, where required by applicable law",
      "Professional advisors such as auditors or legal counsel, where necessary",
    ],
  },
  {
    title: "5. Data Retention",
    body: [
      "We retain personal information only for as long as necessary to fulfil the purposes described in this policy, including satisfying legal, accounting, or reporting requirements. Enquiry and application data not resulting in an ongoing relationship is typically retained for a limited period and then securely deleted or anonymized.",
    ],
  },
  {
    title: "6. Data Security",
    body: [
      "We implement reasonable technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "7. Cookies",
    body: [
      "Our website may use cookies and similar technologies to operate correctly, remember preferences, and understand how visitors use the site. You can control or disable cookies through your browser settings; doing so may affect certain website functionality.",
    ],
  },
  {
    title: "8. Your Rights",
    body: [
      "Depending on applicable law, you may have the right to access, correct, update, or request deletion of your personal information, and to object to or restrict certain processing. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    title: "9. Third-Party Links",
    body: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites, and we encourage you to review their privacy policies separately.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    body: [
      `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The "Last Updated" date at the top of this page indicates when it was last revised. Continued use of our website after changes take effect constitutes acceptance of the revised policy.`,
    ],
  },
  {
    title: "11. Contact Us",
    body: [
      "If you have questions about this Privacy Policy or how we handle your personal information, please contact us:",
    ],
    list: [
      "Email: Onesis@sisindia.com",
      "Phone: +91 011 4646 4444",
    ],
  },
];

export default async function PrivacyPolicyPage() {
  const [nav, footer] = await Promise.all([getGlobal("nav"), getGlobal("footer")]);

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow="Legal"
          heading={<span className="accent">Privacy Policy</span>}
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
                  <div className="mt-4 flex flex-col gap-4">
                    {section.body.map((para, i) => (
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
                  </div>
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