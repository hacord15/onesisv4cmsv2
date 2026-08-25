import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { pageIntroFields, titleDescriptionList } from '../fields/common'
import { seoField } from '../fields/seo'

export const CareerEmployeeBenefits: GlobalConfig = {
  slug: 'career-employee-benefits',
  label: 'Career > Employee Benefits',
  access: { read: anyone, update: authenticated },
  fields: [
    ...pageIntroFields(),
    titleDescriptionList('benefits', { singular: 'Benefit', plural: 'Benefits' }),
    seoField(),
  ],
}
