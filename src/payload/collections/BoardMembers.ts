import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const BoardMembers: CollectionConfig = {
  slug: 'board-members',
  labels: { singular: 'Board Member', plural: 'Board Members' },
  admin: {
    // hidden: true,
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'order'],
    description: 'Company > Board page.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    { name: 'name', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'bio', type: 'textarea', required: true },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers show first.' },
    },
  ],
}
