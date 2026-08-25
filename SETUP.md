# OneSIS — Payload CMS Integration

This adds a full Payload CMS 3 backend (Postgres + S3/MinIO media storage) to the
OneSIS Next.js site. Content — headings, body copy, and images — for the pages
listed below is now editable from `/admin` instead of being hardcoded in
`src/lib/content.ts` / page files.

## 1. Local setup

```bash
# 1. Install dependencies (already includes payload, @payloadcms/*, sharp)
npm install

# 2. Start Postgres + MinIO
docker compose up -d

# 3. Copy env vars (defaults already match docker-compose.yml)
cp .env.example .env
# Open .env and replace PAYLOAD_SECRET with a real random string before
# deploying anywhere real users can reach.

# 4. Seed the CMS with the site's existing content
npm run seed
# This creates an admin user: admin@onesis.in / ChangeMe123!
# (override via SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD env vars)

# 5. Run the site
npm run dev
```

- Site: http://localhost:3000
- Admin panel: http://localhost:3000/admin
- MinIO console (view uploaded files): http://localhost:9001
  (login: `onesis_minio` / `onesis_minio_secret`)

The seed script is safe to re-run — it clears and re-creates each
collection/global it touches.

## 2. What's CMS-driven right now

**Fully wired (fetching live from Postgres, editable in `/admin`, verified working):**

| Page | Data source |
|---|---|
| Nav & Footer (every page) | `Nav` / `Footer` globals |
| `/` Home page — Hero, About, Four Verticals sections | `Home` global |
| `/company/board` | `company-board-page` global + `Board Members` collection |
| `/career/current-openings` | `career-current-openings-page` global + `Job Openings` collection |
| `/solutions/integrated-fm` (hero only) | `Solutions` collection, `slug: integrated-fm` |

**Backend schema exists and is seeded, but the page's JSX still needs to be
rewired to consume it** (this is mechanical — see the pattern below):

- Home page: the remaining sections below "Four Verticals" (`hardcoreRepair`,
  `corporateInterior`, `officeInterior`, `propertyManagement`, `outcomes`,
  `accountability`, `whereWeOperate`, `technology`, `cta`, stats strip) — all
  present in the `Home` global, just not yet wired into their section
  components.
- `/company/onesis`, `/company/sis-group`, `/company/why-onesis`,
  `/company/management`, `/company/news`, `/company/training` — globals +
  (Management Team / News Items / Training Programs) collections are seeded;
  page bodies still read from local arrays.
- `/solutions/property-management`, `/solutions/infrastructure-care`,
  `/solutions/corporate-interior-solutions` — need their own `Solutions`
  collection entries seeded (only `integrated-fm` is seeded right now) and
  the page hero wired the same way `integrated-fm` is.
- `/solutions/case-studies` — `Case Studies` collection is seeded; page still
  reads a local array.
- `/career/why-work-with-us`, `/career/employee-benefits` — globals seeded,
  page bodies still local.
- `/contact/*` — globals seeded (banner/heading/body only — form fields and
  reCAPTCHA logic intentionally stay in code, not CMS).

## 3. The pattern for wiring a remaining page/section

Every one of the above follows the same 3-step shape already used for
Board/Openings/Home — copy it directly:

1. **In `page.tsx`**, fetch what you need and pass it down:
   ```tsx
   import { getGlobal, getCollection, mediaUrl } from "@/lib/payload-fetch";

   const [nav, footer, pageIntro] = await Promise.all([
     getGlobal("nav"),
     getGlobal("footer"),
     getGlobal("company-onesis"), // swap for the global you need
   ]);
   ```
2. **In the section component**, replace the `import { x } from "@/lib/content"`
   line with a prop of the same name, typed from `@/payload-types`:
   ```tsx
   import type { Home } from "@/payload-types";
   export function About({ about }: { about: Home["about"] }) { ... }
   ```
3. **For images**, wrap the media relation with `mediaUrl()` from
   `@/lib/payload-fetch` instead of importing from `@/lib/images`:
   ```tsx
   <Image src={mediaUrl(about.image)} ... />
   ```

Repeatable content (news, training programs, case studies, more job openings,
more solution pages) — add rows in `/admin`, or extend `src/payload/seed.ts`.

## 4. Architecture notes

- **Database:** Postgres via `@payloadcms/db-postgres`. Payload auto-pushes
  schema changes in dev; for production use `npx payload migrate:create` /
  `npx payload migrate` instead of relying on dev push.
- **Media:** All uploads go through the `media` collection, stored on S3 or
  MinIO via `@payloadcms/storage-s3` (`forcePathStyle: true` is required for
  MinIO and most non-AWS S3-compatible providers).
- **Content model:** `Globals` = singleton pages (Home, Nav, Footer, each
  simple company/career/contact page). `Collections` = repeatable items
  (Board Members, Management Team, News, Training Programs, Case Studies,
  Job Openings, and the 4 Solutions pages via a `slug` field).
- **SEO:** every global/collection has a `seo` field group (meta title, meta
  description, OG image) in the admin sidebar — not yet wired into
  `generateMetadata()` on each page, same mechanical pattern as above.
- **Fetching:** `src/lib/payload-fetch.ts` wraps Payload's Local API (no HTTP
  round-trip — runs directly against Postgres inside your Server Components).

## 5. Known pre-existing issue fixed along the way

`brijeshSir.jpg` was referenced with a capital `S` in the original code but
the actual file on disk is `brijeshsir.jpg` — harmless on
case-insensitive filesystems (Mac/Windows dev machines) but a broken image
on case-sensitive Linux production servers. Fixed in the seed script; you may
want to rename the file (or fix the reference) in the original static-asset
code path too if it's still used anywhere.
