import type { Field } from 'payload'

/** Banner + eyebrow + heading + body — the shape every simple PageHero uses. */
export const pageIntroFields = (opts?: { bodyRequired?: boolean }): Field[] => [
  { name: 'banner', type: 'upload', relationTo: 'media', required: true },
  { name: 'eyebrow', type: 'text', required: true },
  { name: 'heading', type: 'text', required: true },
  { name: 'headingAccent', type: 'text' },
  { name: 'body', type: 'textarea', required: opts?.bodyRequired ?? false },
]

/** title + description repeatable item — used for perks/benefits style lists. */
export const titleDescriptionList = (name: string, labels?: { singular: string; plural: string }): Field => ({
  name,
  type: 'array',
  labels,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
  ],
})


