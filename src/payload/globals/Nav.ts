import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const Nav: GlobalConfig = {
  slug: 'nav',
  label: 'Navigation',
  admin: { hidden: true },
  access: { read: anyone, update: authenticated },
  fields: [
    { name: 'logoText', type: 'text', required: true, defaultValue: 'OneSIS' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'parentBadge', type: 'text', defaultValue: 'SIS Group Co.' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Company Profile' },
    {
      name: 'links',
      type: 'array',
      labels: { singular: 'Menu Item', plural: 'Menu Items' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'children',
          type: 'array',
          labels: { singular: 'Submenu Item', plural: 'Submenu Items' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
