import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const ManagementTeam: CollectionConfig = {
  slug: 'management-team',
  labels: { singular: 'Management Team Member', plural: 'Management Team' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'order'],
    description: 'Company > Management Team page.',
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
    { name: 'bio', type: 'textarea' },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers show first.' },
    },
  ],
}
