import { cache } from 'react'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'
import type { Config, Media } from '@/payload-types'

/**
 * Safely pull a usable <img>/<Image> src out of a Payload media relation field.
 * Media fields come back as a populated object (when fetched with depth >= 1) or
 * just a numeric ID (depth 0) — this normalizes both to a string URL.
 */
export function mediaUrl(media: number | Media | null | undefined, fallback = ''): string {
  if (media && typeof media === 'object' && media.url) return media.url
  return fallback
}

/**
 * Cached Payload instance for use in React Server Components.
 * `getPayload` re-uses the same connection across a single request via React's `cache()`.
 */
export const getPayloadClient = cache(async () => {
  return getPayload({ config })
})

type GlobalSlug = keyof Config['globals']

/**
 * Fetch a global (a singleton page like Home, Nav, Footer, etc.) via the Local API —
 * no HTTP round-trip, runs directly against Postgres inside the Server Component.
 */
export async function getGlobal<T extends GlobalSlug>(slug: T) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug, depth: 2 })
}

type CollectionSlug = keyof Config['collections']

/**
 * Fetch all docs from a collection (Board Members, Job Openings, News Items, etc.)
 */
export async function getCollection<T extends CollectionSlug>(
  slug: T,
  options?: { where?: Where; sort?: string; limit?: number },
) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: slug,
    depth: 2,
    limit: options?.limit ?? 100,
    sort: options?.sort,
    where: options?.where,
  })
  return result.docs
}

/** Fetch a single doc from a collection by an arbitrary field match (e.g. slug). */
export async function getCollectionItem<T extends CollectionSlug>(
  slug: T,
  where: Where,
) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: slug,
    depth: 2,
    limit: 1,
    where,
  })
  return result.docs[0] ?? null
}

/**
 * Converts a normal YouTube / Vimeo watch link into an <iframe>-embeddable URL.
 * Returns null if the URL isn't recognized (caller can fall back to a plain link).
 */
export function toEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v') ?? u.pathname.split('/').pop()
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
    return null
  } catch {
    return null
  }
}