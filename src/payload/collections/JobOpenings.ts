import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const JobOpenings: CollectionConfig = {
  slug: 'job-openings',
  labels: { singular: 'Job Opening', plural: 'Job Openings' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'location', 'isActive'],
    // hidden: true,
    description: 'Career > Current Openings page.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'department', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'full-time',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
      ],
    },
    { name: 'experience', type: 'text', admin: { description: 'e.g. 5–8 yrs' } },
    { name: 'description', type: 'textarea' },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Turn off to hide without deleting.' },
    },
  ],
}
