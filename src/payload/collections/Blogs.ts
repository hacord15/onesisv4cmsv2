import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { formatSlugHook } from '../hooks/formatSlug'
export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'featured'],
    description: 'Blog listing cards and individual post detail pages.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              index: true,
              admin: { description: 'Auto-generated from Title if left blank. URL path: /blog/[slug]' },
              hooks: {
                beforeValidate: [formatSlugHook('title')],
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: { description: 'Short summary shown on the blog listing card.' },
            },
            { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
            { name: 'content', type: 'richText', label: 'Body Content' },
            {
              name: 'category',
              type: 'select',
              required: true,
              options: [
                { label: 'Facility Management', value: 'facility-management' },
                { label: 'Industry Insights', value: 'industry-insights' },
                { label: 'Company News', value: 'company-news' },
                { label: 'Case Studies', value: 'case-studies' },
                { label: 'Compliance', value: 'compliance' },
              ],
            },
            { name: 'author', type: 'text', required: true },
            { name: 'publishedAt', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
            {
              name: 'readingTime',
              type: 'number',
              label: 'Reading Time (minutes)',
              admin: { description: 'e.g. 5 (for "5 min read")' },
            },
            { name: 'featured', type: 'checkbox', defaultValue: false },
            {
              name: 'tags',
              type: 'array',
              fields: [{ name: 'tag', type: 'text', required: true }],
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'draft',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
              ],
            },
          ],
        },
        {
          label: 'Related & SEO',
          fields: [
            {
              name: 'relatedBlogs',
              type: 'relationship',
              relationTo: 'blogs',
              hasMany: true,
              admin: { description: 'Shown at the bottom of the detail page.' },
            },
            { name: 'seoTitle', type: 'text' },
            { name: 'seoDescription', type: 'textarea' },
            { name: 'seoImage', type: 'upload', relationTo: 'media', label: 'SEO / Social Share Image' },
          ],
        },
      ],
    },
  ],
}