import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { pageIntroFields } from '../fields/common'
import { seoField } from '../fields/seo'

export const CareerCurrentOpenings: GlobalConfig = {
  slug: 'career-current-openings-page',
  label: 'Career > Current Openings (page intro)',
  admin: { description: 'Banner/intro only. Jobs live in the Job Openings collection.',
    hidden: true,
    
   },
  access: { read: anyone, update: authenticated },
  fields: [...pageIntroFields(), seoField()],
}
