import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { pageIntroFields } from '../fields/common'
import { seoField } from '../fields/seo'

export const CompanyManagementPage: GlobalConfig = {
  slug: 'company-management-page',
  label: 'Company > Management Team (page intro)',
  admin: { description: 'Banner/intro only. Team members live in the Management Team collection.', hidden: true },
  access: { read: anyone, update: authenticated },
  fields: [...pageIntroFields(), seoField()],
}
