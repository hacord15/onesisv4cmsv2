import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { formatSlugHook } from '../hooks/formatSlug'

export const NewsItems: CollectionConfig = {
  slug: 'news-items',
  labels: { singular: 'News Item', plural: 'News Items' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'publishedDate'],
    description:
      'Company > News page. Category controls which section (Media Coverage / Industry Insights / Awards) it appears in. Toggle "Featured" to show it in the Featured News section at the top of the page.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-publishedDate',
  fields: [
    { name: 'title', type: 'text', required: true },
      {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { 
        description: 'Auto-filled from the title — leave blank and it fills itself in when you save. Used at /company/news/[slug].',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlugHook('title')],
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Media Coverage', value: 'media-coverage' },
        { label: 'Industry Insights', value: 'industry-insights' },
        { label: 'Awards', value: 'awards' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this item in the "Featured News" section at the top of the News page.',
      },
    },
    { name: 'publishedDate', type: 'date', required: true, admin: { position: 'sidebar' } },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              admin: { description: 'Short summary shown on the News list page and in card previews.' },
            },
            {
              name: 'content',
              type: 'textarea',
              admin: { description: 'Full article body shown on the detail page. Optional — falls back to summary if empty.' },
            },
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Hero image used on the card and detail page.' } },
            {
              name: 'videoUrl',
              type: 'text',
              admin: { description: 'Optional. Paste a YouTube (or Vimeo) link — it will be embedded on the detail page.' },
            },
            { name: 'source', type: 'text', admin: { description: 'Source name, e.g. Economic Times, Business Standard' } },
            {
              name: 'sourceDetails',
              type: 'group',
              label: 'About the Source',
              admin: { description: 'Optional — powers the "About the Source" card in the detail page sidebar.' },
              fields: [
                { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Small square logo. Falls back to initials if empty.' } },
                { name: 'description', type: 'textarea', admin: { description: 'One or two line description of the publication.' } },
                { name: 'website', type: 'text', admin: { description: 'e.g. https://economictimes.indiatimes.com' } },
              ],
            },
            { name: 'externalLink', type: 'text', admin: { description: 'Optional link to the full external article.' } },
          ],
        },
        {
          label: 'Author & Highlights',
          fields: [
            {
              name: 'author',
              type: 'group',
              label: 'Author',
              admin: { description: 'Optional byline shown on the detail page.' },
              fields: [
                { name: 'name', type: 'text' },
                { name: 'role', type: 'text', admin: { description: 'e.g. Digital Strategy Lead, OneSIS' } },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'linkedin', type: 'text', admin: { description: 'Full LinkedIn profile URL, optional.' } },
                { name: 'bio', type: 'textarea', admin: { description: 'Short one to two line bio.' } },
              ],
            },
            {
              name: 'readingTime',
              type: 'number',
              min: 1,
              admin: { description: 'Estimated reading time in minutes, e.g. 4', width: '50%' },
            },
            {
              name: 'quote',
              type: 'group',
              label: 'Pull Quote',
              admin: { description: 'Optional highlighted quote block shown on the detail page.' },
              fields: [
                { name: 'text', type: 'textarea', label: 'Quote Text' },
                { name: 'attribution', type: 'text', label: 'Attribution', admin: { description: 'e.g. "OneSIS Leadership Team"' } },
              ],
            },
            {
              name: 'keyTakeaways',
              type: 'array',
              labels: { singular: 'Takeaway', plural: 'Key Takeaways' },
              admin: { description: 'Short bullet points shown in a "Key Takeaways" callout box (main column and sidebar).' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'tags',
              type: 'text',
              hasMany: true,
              admin: { description: 'Press enter after each tag. Shown as chips on the detail page.' },
            },
          ],
        },
        {
          label: 'Related News',
          fields: [
            {
              name: 'relatedNews',
              type: 'relationship',
              relationTo: 'news-items',
              hasMany: true,
              maxRows: 3,
              admin: { description: 'Pick up to 3 related articles to show at the bottom of this article.' },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: false,
              fields: [
                { name: 'metaTitle', type: 'text', admin: { description: 'Falls back to Title if left empty.' } },
                { name: 'metaDescription', type: 'textarea', admin: { description: 'Falls back to Summary if left empty.' } },
                { name: 'ogImage', type: 'upload', relationTo: 'media', admin: { description: 'Falls back to the hero Image if left empty.' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}