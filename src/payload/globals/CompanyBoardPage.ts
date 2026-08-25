import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { pageIntroFields } from '../fields/common'
import { seoField } from '../fields/seo'

export const CompanyBoardPage: GlobalConfig = {
  slug: 'company-board-page',
  label: 'Company > Board (page intro)',
  admin: { description: 'Banner/intro only. Board members themselves live in the Board Members collection.', hidden: true },
  access: { read: anyone, update: authenticated },
  fields: [...pageIntroFields(), seoField()],
}
