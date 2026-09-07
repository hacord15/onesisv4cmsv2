import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'rating', 'sortOrder'],
    description: 'Client quotes shown in the homepage Testimonials carousel.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'name', type: 'text', required: true, label: 'Client Name' },
    { name: 'title', type: 'text', label: 'Job Title', admin: { description: 'e.g. Head of Admin' } },
    { name: 'company', type: 'text', label: 'Company / Location', admin: { description: 'e.g. Tech Park, Bengaluru' } },
    {
      name: 'rating',
      type: 'number',
      required: true,
      defaultValue: 5,
      min: 1,
      max: 5,
      admin: { description: '1 to 5 stars' },
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, label: 'Sort Order' },
  ],
}