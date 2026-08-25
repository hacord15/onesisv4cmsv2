import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const TrainingPrograms: CollectionConfig = {
  slug: 'training-programs',
  labels: { singular: 'Training Program', plural: 'Training Programs' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
    description: 'Company > Training & Development page.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers show first.' },
    },
  ],
}
