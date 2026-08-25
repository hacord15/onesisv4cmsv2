import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { pageIntroFields } from '../fields/common'
import { seoField } from '../fields/seo'

export const CompanyTrainingPage: GlobalConfig = {
  slug: 'company-training-page',
  label: 'Company > Training & Development',
  admin: { description: 'Banner/intro + M-Trainer platform features. Programs live in the Training Programs collection.',
    hidden: true,
   },
  access: { read: anyone, update: authenticated },
  fields: [
    ...pageIntroFields(),
    {
      name: 'platformFeatures',
      type: 'array',
      labels: { singular: 'Feature', plural: 'Platform Features' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    seoField(),
  ],
}
