import type { FieldHook } from 'payload'

/**
 * Auto-generates a URL-friendly slug from a source field (usually "title" or
 * "name") whenever the slug is left empty. If the editor types their own
 * slug, that's respected — this only fills in when the field is blank.
 *
 * Usage: attach as a `beforeValidate` hook on the `slug` field itself, or on
 * the collection with `fallback: 'title'` (see NewsItems.ts example below).
 */
export const formatSlugHook = (fallbackField: string = 'title'): FieldHook => {
  return ({ value, originalDoc, data }) => {
    if (typeof value === 'string' && value.trim().length > 0) {
      // Editor typed their own slug — still normalize it, don't override it.
      return slugify(value)
    }

    const fallbackValue = data?.[fallbackField] || originalDoc?.[fallbackField]
    if (fallbackValue && typeof fallbackValue === 'string') {
      return slugify(fallbackValue)
    }

    return value
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric → hyphen
    .replace(/^-+|-+$/g, '')    // trim leading/trailing hyphens
}