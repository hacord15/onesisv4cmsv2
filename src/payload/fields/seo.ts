import type { Field } from 'payload'

/**
 * Reusable SEO field group. Spread this into any collection/global's `fields`
 * array to get consistent meta title, meta description and OG image controls
 * across every page in the CMS.
 *
 * Usage:
 *   fields: [
 *     ...otherFields,
 *     seoField(),
 *   ]
 */
export const seoField = (): Field => ({
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      admin: {
        description: 'Shown in browser tabs & search results. ~50-60 characters.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      admin: {
        description: 'Shown in search results. ~150-160 characters.',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Social Share Image (OG Image)',
    },
  ],
})
