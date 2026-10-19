
import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import {
  contactEnquiryEmail,
  contactEnquiryThankYouEmail,
} from '@/lib/email-templates'

export const ContactEnquiries: CollectionConfig = {
  slug: 'contact-enquiries',

  labels: {
    singular: 'Contact Enquiry',
    plural: 'Contact Enquiries',
  },

  admin: {
    useAsTitle: 'fullName',
    defaultColumns: [
      'fullName',
      'organisation',
      'service',
      'status',
      'createdAt',
    ],
    description:
      'Submissions from the General Enquiry form at /contact/contact-form.',
  },

  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },

  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'organisation',
      type: 'text',
      required: true,
      label: 'Organisation Name',
    },
    {
      name: 'designation',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'City / Location',
    },
    {
      name: 'service',
      type: 'text',
      label: 'Service Required',
    },
    {
      name: 'industry',
      type: 'text',
      label: 'Industry Sector',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      label: 'How did you hear about us?',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],

  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Send emails only when a new enquiry is created.
        if (operation !== 'create') return

        // Admin notification
        try {
          const notifyEmail = process.env.ENQUIRY_NOTIFY_EMAIL

          if (!notifyEmail) {
            req.payload.logger.error(
              'ENQUIRY_NOTIFY_EMAIL is not configured.'
            )
          } else {
            await req.payload.sendEmail({
              to: notifyEmail,
              subject: `New Contact Enquiry — ${doc.fullName} (${doc.organisation})`,
              html: contactEnquiryEmail(doc),
            })
          }
        } catch (err) {
          req.payload.logger.error(
            `Failed to send admin enquiry email: ${
              err instanceof Error ? err.message : String(err)
            }`
          )
        }

        // Customer confirmation
        try {
          await req.payload.sendEmail({
            to: doc.email,
            subject: 'Thank You for Contacting OneSIS',
            html: contactEnquiryThankYouEmail(doc),
          })
        } catch (err) {
          req.payload.logger.error(
            `Failed to send customer confirmation email: ${
              err instanceof Error ? err.message : String(err)
            }`
          )
        }
      },
    ],
  },
}
