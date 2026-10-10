import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { formatSlugHook } from '../hooks/formatSlug'

export const JobOpenings: CollectionConfig = {
  slug: 'job-openings',
  labels: { singular: 'Job Opening', plural: 'Job Openings' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'location', 'type', 'isActive'],
    description: 'Career > Current Openings — listing cards and individual job detail pages.',
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
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Job Title' },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              index: true,
              admin: { description: 'Auto-generated from Job Title if left blank. URL path: /career/current-openings/[slug]' },
              hooks: {
                beforeValidate: [formatSlugHook('title')],
              },
            },
            {
              name: 'department',
              type: 'select',
              required: true,
              options: [
                { label: 'Operations', value: 'operations' },
                { label: 'Technical', value: 'technical' },
                { label: 'Security', value: 'security' },
                { label: 'Corporate', value: 'corporate' },
                { label: 'EHS', value: 'ehs' },
                { label: 'Sales & Business Development', value: 'sales-bd' },
                { label: 'HR & Admin', value: 'hr-admin' },
              ],
            },
            { name: 'location', type: 'text', required: true },
            {
              name: 'type',
              type: 'select',
              required: true,
              label: 'Employment Type',
              options: [
                { label: 'Full-time', value: 'full-time' },
                { label: 'Part-time', value: 'part-time' },
                { label: 'Contract', value: 'contract' },
              ],
            },
            {
              name: 'deploymentType',
              type: 'select',
              label: 'Deployment Type',
              options: [
                { label: 'On-site', value: 'on-site' },
                { label: 'Remote', value: 'remote' },
                { label: 'Hybrid', value: 'hybrid' },
                { label: 'Field / Site-based', value: 'field' },
              ],
            },
            {
              name: 'experience',
              type: 'text',
              required: true,
              label: 'Experience Required',
              admin: { description: 'e.g. 5–8 yrs' },
            },
            {
              name: 'isActive',
              type: 'checkbox',
              defaultValue: true,
              label: 'Active Status',
              admin: { description: 'Turn off to hide without deleting.' },
            },
          ],
        },
       
{
  label: 'Job Detail',
  description: 'Shown on the individual job detail page.',
  fields: [
    {
      name: 'jobDescription',
      type: 'richText',
      label: 'Job Description (JD)',
    },
    {
      name: 'keyResponsibilities',
      type: 'richText',
      label: 'Roles & Responsibilities',
    },
    {
      name: 'candidateRequirements',
      type: 'richText',
      label: 'Candidate Requirements',
    },
  ],
},

      ],
    },
    { name: 'description', type: 'textarea', admin: { hidden: true } },
  ],
}