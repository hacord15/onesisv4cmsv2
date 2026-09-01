import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { BoardMembers } from './payload/collections/BoardMembers'
import { ManagementTeam } from './payload/collections/ManagementTeam'
import { NewsItems } from './payload/collections/NewsItems'
import { TrainingPrograms } from './payload/collections/TrainingPrograms'
import { JobOpenings } from './payload/collections/JobOpenings'

import { Nav } from './payload/globals/Nav'
import { Footer } from './payload/globals/Footer'
import { Home } from './payload/globals/Home'
import { CompanyBoardPage } from './payload/globals/CompanyBoardPage'
import { CompanyManagementPage } from './payload/globals/CompanyManagementPage'
import { CompanyNewsPage } from './payload/globals/CompanyNewsPage'
import { CompanyTrainingPage } from './payload/globals/CompanyTrainingPage'
import { CareerCurrentOpenings } from './payload/globals/CareerCurrentOpenings'
import { CareerEmployeeBenefits } from './payload/globals/CareerEmployeeBenefits'
import { CaseStudies } from './payload/collections/CaseStudies'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- OneSIS CMS',
    },
  },
  collections: [
    Users,
    Media,
    BoardMembers,
    ManagementTeam,
    NewsItems,
    TrainingPrograms,
    JobOpenings,
    CaseStudies,
  ],
  globals: [
    Nav,
    Footer,
    Home,
    CompanyBoardPage,
    CompanyManagementPage,
    CompanyNewsPage,
    CompanyTrainingPage,
    CareerCurrentOpenings,
    CareerEmployeeBenefits,
    
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        // Required for MinIO (and most S3-compatible providers other than AWS itself)
        forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
      },
    }),
  ],
  // Lets the Next.js frontend read `payload.config.ts` cleanly via `@payload-config`
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
})
