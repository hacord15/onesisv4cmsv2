import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { partnershipEnquiryEmail } from '@/lib/email-templates'

export const PartnershipEnquiries: CollectionConfig = {
  slug: 'partnership-enquiries',
  labels: { singular: 'Partnership Enquiry', plural: 'Partnership Enquiries' },
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'contactPerson', 'partnershipType', 'status', 'createdAt'],
    description: 'Submissions from the Partnership form at /contact/partnership-form.',
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'companyName', type: 'text', required: true, label: 'Company Name' },
    { name: 'contactPerson', type: 'text', required: true },
    { name: 'designation', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'city', type: 'text', required: true, label: 'City / State' },
    { name: 'partnershipType', type: 'text', label: 'Type of Partnership' },
    { name: 'experience', type: 'number', label: 'Years of Experience' },
    { name: 'specialization', type: 'text', required: true, label: 'Services / Specialization Offered' },
    { name: 'message', type: 'textarea', required: true, label: 'Message / Brief Introduction' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
 hooks: {
  afterChange: [
    async ({ doc, operation, req }) => {
      if (operation !== 'create') return
      try {
        await req.payload.sendEmail({
          to: process.env.ENQUIRY_NOTIFY_EMAIL,
          subject: `New Partnership Enquiry — ${doc.companyName}`,
          html: partnershipEnquiryEmail(doc),
        })
      } catch (err) {
        req.payload.logger.error(`Failed to send partnership enquiry email: ${err}`)
      }
    },
  ],
},
}