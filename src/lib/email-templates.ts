type EmailRow = {
  icon: string;
  label: string;
  value?: string | number | null;
  isMessage?: boolean;
};

const BRAND = "#c1440e";
const BRAND_DARK = "#9a3609";
const INK = "#14110f";
const MUTED = "#7a756d";
const CREAM = "#f5f2ec";
const BORDER = "#e8e4dc";

/**
 * Inline SVGs from Lucide (lucide.dev — MIT licensed, open source).
 * Inlined as raw markup (not <img> or a font) so they render in email
 * clients without needing external asset requests.
 */
function icon(paths: string, color = MUTED) {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;display:inline-block;">${paths}</svg>`;
}

const ICONS = {
  user: icon(`<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`),
  building: icon(
    `<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>`
  ),
  briefcase: icon(
    `<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>`
  ),
  mail: icon(
    `<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`
  ),
  phone: icon(
    `<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>`
  ),
  mapPin: icon(
    `<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>`
  ),
  wrench: icon(
    `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`
  ),
  factory: icon(
    `<path d="M15 6h6v18H3V6h6l3-3 3 3Z" transform="translate(0,-2)"/><path d="M17 18h.01"/><path d="M7 18h.01"/>`
  ),
  megaphone: icon(
    `<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>`
  ),
  message: icon(
    `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
    BRAND
  ),
  handshake: icon(
    `<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>`
  ),
  calendar: icon(
    `<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>`
  ),
  settings: icon(
    `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`
  ),
};

function emailShell({
  badge,
  heading,
  intro,
  rows,
  ctaLabel,
  ctaUrl,
  footerNote,
}: {
  badge: string;
  heading: string;
  intro: string;
  rows: EmailRow[];
  ctaLabel?: string;
  ctaUrl?: string;
  footerNote?: string;
}) {
  const filledRows = rows.filter(
    (r) => r.value !== undefined && r.value !== null && r.value !== ""
  );

  const rowsHtml = filledRows
    .map((r, i) => {
      if (r.isMessage) {
        return `
          <tr>
            <td colspan="2" style="padding:18px 0 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:${CREAM};border-left:3px solid ${BRAND};border-radius:8px;padding:16px 18px;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${BRAND};margin-bottom:6px;">
                      ${r.icon} ${r.label}
                    </div>
                    <div style="font-size:14px;line-height:1.65;color:${INK};white-space:pre-line;">
                      ${r.value}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
      }
      const zebra = i % 2 === 0 ? "#ffffff" : "#fbfaf8";
      return `
        <tr style="background:${zebra};">
          <td style="padding:11px 14px;font-size:12.5px;color:${MUTED};width:150px;vertical-align:top;white-space:nowrap;">
            ${r.icon} ${r.label}
          </td>
          <td style="padding:11px 14px;font-size:14px;color:${INK};font-weight:600;vertical-align:top;">
            ${r.value}
          </td>
        </tr>`;
    })
    .join("");

  return `
  <div style="background:${CREAM};padding:40px 16px;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:0 auto;">

      <!-- Header -->
      <tr>
        <td style="border-radius:16px 16px 0 0;overflow:hidden;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%);">
            <tr>
              <td style="padding:28px 32px 24px;">
                <div style="font-size:18px;font-weight:800;letter-spacing:0.06em;color:#ffffff;">ONESIS</div>
                <div style="font-size:11px;letter-spacing:0.05em;color:rgba(255,255,255,0.75);margin-top:2px;text-transform:uppercase;">
                  Integrated Facility Management
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px;">
                <span style="display:inline-block;background:rgba(255,255,255,0.16);color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;padding:5px 12px;border-radius:999px;">
                  ${badge}
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Body card -->
      <tr>
        <td style="background:#ffffff;border:1px solid ${BORDER};border-top:none;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:28px 28px 6px;">
                <h1 style="margin:0 0 8px;font-size:20px;color:${INK};">${heading}</h1>
                <p style="margin:0 0 4px;font-size:13.5px;color:${MUTED};line-height:1.6;">${intro}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:10px;overflow:hidden;">
                  ${rowsHtml}
                </table>
              </td>
            </tr>
            ${
              ctaLabel && ctaUrl
                ? `<tr>
                    <td style="padding:24px 28px 8px;">
                      <a href="${ctaUrl}" style="display:inline-block;background:${BRAND};color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.03em;text-decoration:none;padding:12px 24px;border-radius:8px;">
                        ${ctaLabel} &rarr;
                      </a>
                    </td>
                  </tr>`
                : ""
            }
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#ffffff;border:1px solid ${BORDER};border-top:none;border-radius:0 0 16px 16px;padding:20px 28px 26px;">
          ${footerNote ? `<p style="margin:0 0 10px;font-size:11.5px;color:#a39d92;line-height:1.6;">${footerNote}</p>` : ""}
          <p style="margin:0;font-size:11px;color:#c4bfb4;">
            This is an automated notification from the OneSIS website.
          </p>
        </td>
      </tr>
    </table>
  </div>`;
}

export function contactEnquiryEmail(doc: {
  id?: string | number;
  fullName: string;
  organisation: string;
  designation?: string | null;
  email: string;
  phone: string;
  city: string;
  service?: string | null;
  industry?: string | null;
  source?: string | null;
  message: string;
}) {
  const adminUrl =
    doc.id && process.env.NEXT_PUBLIC_SERVER_URL
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/contact-enquiries/${doc.id}`
      : undefined;

  return emailShell({
    badge: "General Enquiry",
    heading: `New enquiry from ${doc.fullName}`,
    intro: `${doc.fullName} from ${doc.organisation} submitted a general enquiry through the OneSIS website.`,
    rows: [
      { icon: ICONS.user, label: "Name", value: doc.fullName },
      { icon: ICONS.building, label: "Organisation", value: doc.organisation },
      { icon: ICONS.briefcase, label: "Designation", value: doc.designation },
      { icon: ICONS.mail, label: "Email", value: doc.email },
      { icon: ICONS.phone, label: "Phone", value: doc.phone },
      { icon: ICONS.mapPin, label: "City", value: doc.city },
      { icon: ICONS.wrench, label: "Service Required", value: doc.service },
      { icon: ICONS.factory, label: "Industry", value: doc.industry },
      { icon: ICONS.megaphone, label: "Heard about us via", value: doc.source },
      { icon: ICONS.message, label: "Message", value: doc.message, isMessage: true },
    ],
    ctaLabel: "View in Admin Panel",
    ctaUrl: adminUrl,
    footerNote: "This enquiry has also been saved in the Payload admin panel under Contact Enquiries.",
  });
}

export function partnershipEnquiryEmail(doc: {
  id?: string | number;
  companyName: string;
  contactPerson: string;
  designation?: string | null;
  email: string;
  phone: string;
  city: string;
  partnershipType?: string | null;
  experience?: number | null;
  specialization: string;
  message: string;
}) {
  const adminUrl =
    doc.id && process.env.NEXT_PUBLIC_SERVER_URL
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/partnership-enquiries/${doc.id}`
      : undefined;

  return emailShell({
    badge: "Partnership Application",
    heading: `New partner application — ${doc.companyName}`,
    intro: `${doc.contactPerson} from ${doc.companyName} applied to partner with OneSIS.`,
    rows: [
      { icon: ICONS.building, label: "Company", value: doc.companyName },
      { icon: ICONS.user, label: "Contact Person", value: doc.contactPerson },
      { icon: ICONS.briefcase, label: "Designation", value: doc.designation },
      { icon: ICONS.mail, label: "Email", value: doc.email },
      { icon: ICONS.phone, label: "Phone", value: doc.phone },
      { icon: ICONS.mapPin, label: "City / State", value: doc.city },
      { icon: ICONS.handshake, label: "Partnership Type", value: doc.partnershipType },
      { icon: ICONS.calendar, label: "Experience", value: doc.experience ? `${doc.experience} years` : undefined },
      { icon: ICONS.settings, label: "Specialization", value: doc.specialization },
      { icon: ICONS.message, label: "Message", value: doc.message, isMessage: true },
    ],
    ctaLabel: "View in Admin Panel",
    ctaUrl: adminUrl,
    footerNote: "This application has also been saved in the Payload admin panel under Partnership Enquiries.",
  });
}

export function contactEnquiryThankYouEmail(doc: {
  fullName: string;
  organisation: string;
}) {
  return `
    <div style="background:${CREAM};padding:40px 16px;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
      <table
        role="presentation"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="max-width:580px;margin:0 auto;"
      >

        <!-- Header -->
        <tr>
          <td
            style="
              background:linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%);
              padding:28px 32px;
              border-radius:16px 16px 0 0;
            "
          >
            <div style="
              font-size:20px;
              font-weight:800;
              letter-spacing:0.06em;
              color:#ffffff;
            ">
              ONESIS
            </div>

            <div style="
              font-size:11px;
              letter-spacing:0.05em;
              color:rgba(255,255,255,0.75);
              margin-top:3px;
              text-transform:uppercase;
            ">
              Integrated Facility Management
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td
            style="
              background:#ffffff;
              border:1px solid ${BORDER};
              border-top:none;
              padding:36px 32px;
            "
          >

            <h1 style="
              margin:0 0 16px;
              font-size:24px;
              color:${INK};
            ">
              Thank You for Your Interest
            </h1>

            <p style="
              margin:0 0 16px;
              font-size:14px;
              color:${INK};
              line-height:1.7;
            ">
              Dear ${doc.fullName},
            </p>

            <p style="
              margin:0 0 16px;
              font-size:14px;
              color:${MUTED};
              line-height:1.7;
            ">
              Thank you for reaching out to OneSIS and for showing interest
              in our facility management solutions.
            </p>

            <p style="
              margin:0 0 24px;
              font-size:14px;
              color:${MUTED};
              line-height:1.7;
            ">
              We have successfully received your enquiry. Our team will
              review your requirements and a representative will get in
              touch with you within <strong>2 business days</strong>.
            </p>

            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="
                background:${CREAM};
                border-left:3px solid ${BRAND};
                border-radius:8px;
              "
            >
              <tr>
                <td style="padding:16px 18px;">
                  <div style="
                    font-size:12px;
                    font-weight:700;
                    color:${BRAND};
                    margin-bottom:6px;
                  ">
                    ENQUIRY RECEIVED
                  </div>

                  <div style="
                    font-size:13px;
                    color:${INK};
                    line-height:1.6;
                  ">
                    Your enquiry has been registered successfully with OneSIS.
                  </div>
                </td>
              </tr>
            </table>

            <p style="
              margin:28px 0 0;
              font-size:14px;
              color:${INK};
              line-height:1.6;
            ">
              Regards,<br />
              <strong>OneSIS Team</strong><br />
              Integrated Facility Management
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td
            style="
              background:#ffffff;
              border:1px solid ${BORDER};
              border-top:none;
              border-radius:0 0 16px 16px;
              padding:20px 32px 26px;
            "
          >
            <p style="
              margin:0;
              font-size:11px;
              color:#a39d92;
              line-height:1.6;
            ">
              This is an automated confirmation from the OneSIS website.
              Please do not reply to this email.
            </p>
          </td>
        </tr>

      </table>
    </div>
  `;
}