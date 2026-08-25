import type { Field, GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { seoField } from '../fields/seo'

const statPair: Field = {
  name: 'stats',
  type: 'array',
  labels: { singular: 'Stat', plural: 'Stats' },
  fields: [
    { name: 'value', type: 'text', required: true },
    { name: 'label', type: 'text', required: true },
  ],
}

const outcomeItems: Field = {
  name: 'items',
  type: 'array',
  labels: { singular: 'Item', plural: 'Items' },
  fields: [
    { name: 'index', type: 'text', required: true, admin: { description: 'e.g. 01' } },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
  ],
}

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  access: { read: anyone, update: authenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'hero', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'array', labels: { singular: 'Line', plural: 'Lines' }, fields: [{ name: 'text', type: 'text' }] },
              { name: 'headingAccent', type: 'text' },
              { name: 'body', type: 'textarea', required: true },
              { name: 'primaryCta', type: 'text' },
              { name: 'secondaryCta', type: 'text' },
              { name: 'scrollLabel', type: 'text' },
              { name: 'banner', type: 'upload', relationTo: 'media', required: true },
              statPair,
            ]},
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'about', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'array', labels: { singular: 'Line', plural: 'Lines' }, fields: [{ name: 'text', type: 'text' }] },
              { name: 'headingAccent', type: 'text' },
              { name: 'body', type: 'textarea', required: true },
              { name: 'badges', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
              { name: 'facts', type: 'array', fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ]},
              { name: 'image', type: 'upload', relationTo: 'media', required: true },
              { name: 'imageCaption', type: 'text' },
            ]},
          ],
        },
        {
          label: 'Four Verticals',
          fields: [
            { name: 'verticals', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'text', required: true },
              { name: 'headingAccent', type: 'text' },
              { name: 'body', type: 'textarea' },
              { name: 'items', type: 'array', minRows: 1, fields: [
                { name: 'index', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                { name: 'tags', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
              ]},
            ]},
          ],
        },
        {
          label: 'Stats Strip',
          fields: [
            { name: 'statsStrip', type: 'array', fields: [
              { name: 'value', type: 'text', required: true },
              { name: 'label', type: 'text', required: true },
            ]},
          ],
        },
        {
          label: 'Spotlight: IFM',
          description: 'Displayed on homepage as "Integrated Facility Management" spotlight',
          fields: [
            { name: 'hardcoreRepair', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'text', required: true },
              { name: 'headingAccent', type: 'text' },
              { name: 'body', type: 'textarea', required: true },
              { name: 'sectorsHeading', type: 'text' },
              { name: 'checklist', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
              { name: 'cta', type: 'text' },
              { name: 'image', type: 'upload', relationTo: 'media', required: true },
              { name: 'imageCaption', type: 'text' },
              { name: 'imageSubcaption', type: 'text' },
            ]},
          ],
        },
        {
          label: 'Spotlight: Infra Care',
          description: 'Displayed on homepage as "Infrastructure Care" spotlight',
          fields: [
            { name: 'corporateInterior', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'text', required: true },
              { name: 'headingAccent', type: 'text' },
              { name: 'sectorsHeading', type: 'text' },
              { name: 'body', type: 'textarea', required: true },
              { name: 'checklist', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
              { name: 'cta', type: 'text' },
              { name: 'image', type: 'upload', relationTo: 'media', required: true },
              { name: 'imageCaption', type: 'text' },
              { name: 'imageSubcaption', type: 'text' },
            ]},
          ],
        },
        {
          label: 'Spotlight: Interiors',
          description: 'Displayed on homepage as "Corporate Interior Solutions" spotlight',
          fields: [
            { name: 'officeInterior', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'text', required: true },
              { name: 'headingAccent', type: 'text' },
              { name: 'sectorsHeading', type: 'text' },
              { name: 'body', type: 'textarea', required: true },
              { name: 'checklist', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
              { name: 'cta', type: 'text' },
              { name: 'image', type: 'upload', relationTo: 'media', required: true },
              { name: 'imageCaption', type: 'text' },
              { name: 'imageSubcaption', type: 'text' },
              statPair,
            ]},
          ],
        },
        {
          label: 'Spotlight: Property Mgmt',
          description: 'Displayed on homepage as "End-to-End Property Management" spotlight',
          fields: [
            { name: 'propertyManagement', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'text', required: true },
              { name: 'headingAccent', type: 'text' },
              { name: 'sectorsHeading', type: 'text' },
              { name: 'body', type: 'textarea', required: true },
              { name: 'checklist', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
              { name: 'cta', type: 'text' },
              { name: 'image', type: 'upload', relationTo: 'media', required: true },
              { name: 'imageCaption', type: 'text' },
              { name: 'imageSubcaption', type: 'text' },
            ]},
          ],
        },
        {
          label: 'Four Outcomes',
          fields: [
            { name: 'outcomes', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
              { name: 'headingAccent', type: 'text' },
              { name: 'body', type: 'textarea' },
              outcomeItems,
            ]},
          ],
        },
        {
          label: 'Accountability',
          fields: [
            { name: 'accountability', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'text', required: true },
              { name: 'headingAccent', type: 'text' },
              { name: 'headingTail', type: 'text' },
              { name: 'body', type: 'textarea' },
              outcomeItems,
            ]},
          ],
        },
        {
          label: 'Where We Operate',
          fields: [
            { name: 'whereWeOperate', type: 'group', fields: [
              { name: 'heading', type: 'text', required: true },
              { name: 'headingAccent', type: 'text' },
              { name: 'body', type: 'textarea' },
            ]},
          ],
        },
        {
          label: 'Technology',
          fields: [
            { name: 'technology', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'text', required: true },
              { name: 'headingAccent', type: 'text' },
              { name: 'headingTail', type: 'text' },
              { name: 'body', type: 'textarea' },
              { name: 'cta', type: 'text' },
              { name: 'platforms', type: 'array', fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'tag', type: 'text' },
                { name: 'description', type: 'textarea', required: true },
                { name: 'highlighted', type: 'checkbox', defaultValue: false },
              ]},
            ]},
          ],
        },
        {
          label: 'Final CTA',
          fields: [
            { name: 'cta', type: 'group', fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'heading', type: 'text', required: true },
              { name: 'headingAccent', type: 'text' },
              { name: 'headingTail', type: 'text' },
              { name: 'body', type: 'textarea' },
              { name: 'primaryCta', type: 'text' },
              { name: 'secondaryCta', type: 'text' },
              { name: 'stats', type: 'array', fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
                { name: 'highlighted', type: 'checkbox', defaultValue: false },
              ]},
            ]},
          ],
        },
        {
          label: 'SEO',
          fields: [seoField()],
        },
      ],
    },
  ],
}
