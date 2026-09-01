import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { anyone, authenticated } from '../access'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',

  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'clientName',
      'category',
      'featured',
      'sortOrder',
    ],
    description:
      'Solutions > Case Studies — listing cards and individual project detail pages.',
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
          label: 'Listing Card',
          description: 'Shown on the /solutions/case-studies grid.',

          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
            },

            {
              name: 'clientName',
              type: 'text',
              label: 'Client Name',
            },

            {
              name: 'location',
              type: 'text',
              label: 'Location',
            },

            {
              name: 'category',
              type: 'select',
              required: true,
              label: 'Category',

              options: [
                {
                  label: 'Civil & Interior',
                  value: 'civil-interior',
                },
                {
                  label: 'Property Management',
                  value: 'property-management',
                },
                {
                  label: 'Specialized Civil',
                  value: 'specialized-civil',
                },
                {
                  label: 'IFM / Technical',
                  value: 'ifm-technical',
                },
                {
                  label: 'PMC',
                  value: 'pmc',
                },
              ],
            },

            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Cover Image',
            },

            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Short Description',
            },

            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              label: 'Featured',
            },

            {
              name: 'sortOrder',
              type: 'number',
              defaultValue: 0,
              label: 'Sort Order',
            },

            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              label: 'Slug',

              admin: {
                description:
                  'URL path: /solutions/case-studies/[slug]',
              },
            },
          ],
        },

        {
          label: 'Project Detail',
          description:
            'Shown on the individual case study page.',

          fields: [
            {
              name: 'projectOverview',
              type: 'richText',
              label: 'Project Overview',
              editor: lexicalEditor(),
            },

            {
              name: 'solution',
              type: 'richText',
              label: 'The Solution',
              editor: lexicalEditor(),
            },

            {
              name: 'services',
              type: 'array',
              label: 'Services',

              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Service',
                },
              ],
            },

            {
              name: 'keyFigures',
              type: 'array',
              label: 'Key Figures',

              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  label: 'Value',

                  admin: {
                    description:
                      'e.g. 22,77,219 Sqft',
                  },
                },

                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label',

                  admin: {
                    description:
                      'e.g. Residential Building',
                  },
                },
              ],
            },

            {
              name: 'projectImages',
              type: 'array',
              label: 'Project Images',

              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Image',
                },
              ],
            },

            {
              name: 'projectType',
              type: 'text',
              label: 'Project Type',
            },

            {
              name: 'areaSize',
              type: 'text',
              label: 'Area / Size',
            },

            {
              name: 'completionYear',
              type: 'number',
              label: 'Completion Year',
            },

            {
              name: 'additionalDetails',
              type: 'richText',
              label: 'Additional Details',
              editor: lexicalEditor(),
            },
          ],
        },

        {
          label: 'SEO',

          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
            },

            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
            },
          ],
        },
      ],
    },
  ],
}