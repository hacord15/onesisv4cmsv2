import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { hidden: true },
  access: { read: anyone, update: authenticated },
  fields: [
    { name: 'description', type: 'textarea', required: true },
    { name: 'badge', type: 'text' },
    {
      name: 'columns',
      type: 'array',
      labels: { singular: 'Column', plural: 'Columns' },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      labels: { singular: 'Social Link', plural: 'Social Links' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'copyright', type: 'text', required: true },
  ],
}
