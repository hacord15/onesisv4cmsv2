import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { pageIntroFields } from '../fields/common'
import { seoField } from '../fields/seo'

export const CompanyNewsPage: GlobalConfig = {
  slug: 'company-news-page',
  label: 'Company > News (page intro)',
  admin: { description: 'Banner/intro only. Articles live in the News Items collection.', hidden: true },
  access: { read: anyone, update: authenticated },
  fields: [...pageIntroFields(), seoField()],
}
