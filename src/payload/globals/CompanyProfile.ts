import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const CompanyProfile: GlobalConfig = {
  slug: 'company-profile',
  label: 'Company Profile (Download)',
  admin: {
    description:
      'The file used by every "Download Profile" button across the site (Header, CTA section). Replace the file here and it updates everywhere automatically. Any file type is accepted — PDF, DOCX, ZIP, etc.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Company Profile File',
      admin: { description: 'Upload the latest company profile file — any format is accepted.' },
      // No `filterOptions` / mimeType restriction here — any file the
      // Media collection itself accepts is allowed for this field.
    },
    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'Download Company Profile',
      label: 'Button Label',
    },
  ],
}