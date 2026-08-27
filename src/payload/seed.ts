/**
 * Seeds Payload/Postgres with the OneSIS site's existing content
 * (pulled from src/lib/content.ts, src/lib/images.ts and the various page files)
 * so the CMS isn't empty on first boot.
 *
 * Run with:  npm run seed
 * Safe to re-run — it upserts by clearing collections/globals first.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type Payload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(dirname, '../../public')

// ---------------------------------------------------------------------------
// Image helpers
// ---------------------------------------------------------------------------

// Caches PROMISES (not just resolved values) so that two concurrent calls for
// the same source image (e.g. used with different alt text in different
// sections) share a single upload instead of racing each other.
const mediaCache = new Map<string, Promise<number | undefined>>()

/** Upload an image that already exists in /public (e.g. "/assests/homepage/hero-banner-img.png") */
function uploadLocal(payload: Payload, relativePath: string, alt: string): Promise<number | undefined> {
  const cacheKey = `local:${relativePath}`
  const cached = mediaCache.get(cacheKey)
  if (cached) return cached

  const promise = (async () => {
    const filePath = path.join(publicDir, relativePath.replace(/^\//, ''))
    try {
      const doc = await payload.create({
        collection: 'media',
        data: { alt },
        filePath,
      })
      return doc.id as number
    } catch (err) {
      console.warn(`  ⚠ could not upload local image ${relativePath}:`, (err as Error).message)
      return undefined
    }
  })()
  mediaCache.set(cacheKey, promise)
  return promise
}

/** Upload an image from a remote URL (used for the a few picsum.photos placeholders) */
function uploadRemote(payload: Payload, url: string, alt: string, filename: string): Promise<number | undefined> {
  const cacheKey = `remote:${url}`
  const cached = mediaCache.get(cacheKey)
  if (cached) return cached

  const promise = (async () => {
    try {
      const res = await fetch(url)
      const arrayBuffer = await res.arrayBuffer()
      const doc = await payload.create({
        collection: 'media',
        data: { alt },
        file: {
          data: Buffer.from(arrayBuffer),
          mimetype: res.headers.get('content-type') || 'image/jpeg',
          name: filename,
          size: arrayBuffer.byteLength,
        },
      })
      return doc.id as number
    } catch (err) {
      console.warn(`  ⚠ could not upload remote image ${url}:`, (err as Error).message)
      return undefined
    }
  })()
  mediaCache.set(cacheKey, promise)
  return promise
}

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function seed() {
  const payload = await getPayload({ config })
  console.log('Seeding OneSIS content into Postgres…\n')

  // --- 0. Admin user -------------------------------------------------------
  const { totalDocs: userCount } = await payload.find({ collection: 'users', limit: 1 })
  if (userCount === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: process.env.SEED_ADMIN_EMAIL || 'admin@onesis.in',
        password: process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!',
        roles: ['admin'],
      },
    })
    console.log('✓ Created admin user:', process.env.SEED_ADMIN_EMAIL || 'admin@onesis.in')
  }

  // --- 1. Nav ----------------------------------------------------------------
  await payload.updateGlobal({
    slug: 'nav',
    data: {
      logoText: 'OneSIS',
      parentBadge: 'SIS Group Co.',
      ctaLabel: 'Company Profile',
      links: [
        {
          label: 'COMPANY',
          href: '/company/onesis',
          children: [
            { label: 'About SIS Group', href: '/company/sis-group' },
            { label: 'About OneSIS', href: '/company/onesis' },
            { label: 'Board', href: '/company/board' },
            { label: 'Management Team', href: '/company/management' },
            { label: 'Why OneSIS', href: '/company/why-onesis' },
            { label: 'News', href: '/company/news' },
            { label: 'Training', href: '/company/training' },
          ],
        },
        {
          label: 'SOLUTIONS',
          href: '#',
          children: [
            { label: 'Integrated Facility Management', href: '/solutions/integrated-fm' },
            { label: 'Property Management', href: '/solutions/property-management' },
            { label: 'Infrastructure Care', href: '/solutions/infrastructure-care' },
            { label: 'Corporate Interior Solutions', href: '/solutions/corporate-interior-solutions' },
          ],
        },
        {
          label: 'CAREER',
          href: '/career/current-openings',
          children: [
            { label: 'Why Work With Us', href: '/career/why-work-with-us' },
            { label: 'Current Openings', href: '/career/current-openings' },
            { label: 'Employee Benefits', href: '/career/employee-benefits' },
          ],
        },
        {
          label: 'CONTACT US',
          href: '/contact/contact-form',
          children: [
            { label: 'Become a Partner', href: '/contact/partnership-form' },
            { label: 'Presence Map', href: '/contact/presence-map' },
            { label: 'Contact Form', href: '/contact/contact-form' },
          ],
        },
      ],
    },
  })
  console.log('✓ Nav')

  // --- 2. Footer ---------------------------------------------------------
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description:
        "A SIS Group company delivering technology-driven, group managed integrated facility management, real estate services, hardcore repair & maintenance, and office interior management across India.",
      badge: "Part of SIS Group — India's #1 FM Company",
      columns: [
        {
          title: 'Company',
          links: [
            { label: 'About SIS Group', href: '/company/sis-group' },
            { label: 'About OneSIS', href: '/company/onesis' },
            { label: 'Board & Management', href: '/company/board' },
            { label: 'Why OneSIS', href: '/company/why-onesis' },
            { label: 'News & Updates', href: '/company/news' },
          ],
        },
        {
          title: 'Solutions',
          links: [
            { label: 'Integrated Facility Management', href: '/solutions/integrated-fm' },
            { label: 'Property Management', href: '/solutions/property-management' },
            { label: 'Infrastructure Care', href: '/solutions/infrastructure-care' },
            { label: 'Corporate Interior Solutions', href: '/solutions/corporate-interior-solutions' },
          ],
        },
        {
          title: 'Connect',
          links: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'Careers', href: '/career/current-openings' },
            { label: 'Download Profile', href: '/download-profile' },
            { label: 'Privacy Policy', href: '/privacy-policy' },
          ],
        },
      ],
      social: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/company/onesis/' },
        { label: 'Twitter', href: 'https://twitter.com/onesis' },
        { label: 'Instagram', href: 'https://www.instagram.com/onesis/' },
      ],
      copyright: '© 2024 OneSIS. A SIS Ltd Company. All rights reserved.',
    },
  })
  console.log('✓ Footer')

  // --- 3. Home -------------------------------------------------------------
  const [
    heroBanner,
    aboutBanner,
    vFM,
    vPM,
    vRepair,
    vInterior,
    ifmImg,
    infraImg,
    interiorImg,
    pmImg,
  ] = await Promise.all([
    uploadLocal(payload, '/assests/homepage/hero-banner-img.png', 'OneSIS hero banner'),
    uploadLocal(payload, '/assests/homepage/about-img.png', 'About OneSIS'),
    uploadLocal(payload, '/assests/homepage/integrated-fm.png', 'Integrated Facility Management'),
    uploadLocal(payload, '/assests/homepage/property-management.png', 'Property Management'),
    uploadLocal(payload, '/assests/homepage/hardcore-repair.png', 'Infrastructure Care'),
    uploadLocal(payload, '/assests/homepage/office-interior.jpg', 'Corporate Interior Solutions'),
    uploadLocal(payload, '/assests/homepage/repair-spotlight.jpg', 'Integrated Facility Management spotlight'),
    uploadLocal(payload, '/assests/homepage/operate-two.jpg', 'Infrastructure Care spotlight'),
    uploadLocal(payload, '/assests/homepage/office-interior.jpg', 'Corporate Interior Solutions spotlight'),
    uploadLocal(payload, '/assests/homepage/property-spotlight.jpg', 'Property Management spotlight'),
  ])

  await payload.updateGlobal({
    slug: 'home',
    data: {
      hero: {
        eyebrow: 'One Vision, Infinite Solution',
        heading: [{ text: 'Reimagining Workplace Solutions' }, { text: ' for Modern India. ' }],
        headingAccent: 'Integrated Facility Management',
        body: "Technology-driven, fully Group Companies Managed facility solutions — FM, property management, hardcore repair & maintenance, and office fitouts — backed by SIS Group's ₹15,982 Cr enterprise strength.",
        primaryCta: 'Explore Solutions',
        secondaryCta: 'Download Company Profile',
        scrollLabel: 'Scroll to Explore',
        banner: heroBanner,
        stats: [
          { value: '₹15,982 Cr', label: 'Annual Turnover' },
          { value: '3.5 Lakh+', label: 'Workforce Strength' },
          { value: '29 States', label: 'Pan-India Presence' },
          { value: '320K+', label: 'Sites Managed' },
        ],
      },
      about: {
        eyebrow: 'About OneSIS',
        heading: [{ text: 'Reimagining Facilities for' }, { text: '' }],
        headingAccent: 'Modern India',
        body: "Born with a vision to redefine Integrated Facility Management & Property Management, OneSIS combines the strength of the SIS Group's legacy with next-generation technology and operational excellence. To create healthier workplaces, enhance occupier experience, and deliver customer delight through seamless, self-performed service model, through Group companies, ensuring complete accountability, consistent quality, and measurable business outcomes.",
        badges: [
          { label: 'Group Companies Managed' },
          { label: 'Technology-First' },
          { label: 'SIS Group Backup' },
          { label: 'SLA Guaranteed' },
          { label: 'Pan-India Presence' },
          { label: 'End-to-End Solutions' },
        ],
        facts: [
          { value: '2024', label: 'Established, India' },
          { value: '100%', label: 'SIS Ltd Subsidiary' },
          { value: '₹15,982 Cr', label: 'SIS Group Revenue' },
          { value: '3.5 Lakh', label: 'SIS Group Employees' },
          { value: '16', label: 'SIS Group Companies' },
          { value: '790', label: 'Districts' },
        ],
        image: aboutBanner,
        imageCaption: 'Residential & Commercial',
      },
      verticals: {
        eyebrow: 'What We Offer',
        heading: 'Four Core Verticals,',
        headingAccent: 'One Accountable Partner',
        body: 'Whether you need day-to-day facility upkeep, end-to-end property management, critical mechanical repairs, or a complete office interior transformation — OneSIS owns every outcome under a single agreement.',
        items: [
          {
            index: '01',
            title: 'Integrated Facility Management',
            description: 'End-to-end FM under a single agreement — eliminating multi-vendor complexity across every site.',
            tags: [{ label: 'Soft Services' }, { label: 'MEP' }, { label: 'EHS' }, { label: 'Security' }, { label: 'Horticulture' }],
            image: vFM,
          },
          {
            index: '02',
            title: 'Property Management',
            description: 'Commercial & Residential property operations with full owner occupant and transparency satisfaction.',
            tags: [{ label: 'Commercial' }, { label: 'Residential' }, { label: 'Mall Management' }],
            image: vPM,
          },
          {
            index: '03',
            title: 'Infrastructure Care',
            description: 'Structural, civil & mechanical repair work by trained technicians — zero compromise on safety.',
            tags: [{ label: 'Infrastructure Reliability' }, { label: 'Sustainability services' }, { label: 'Asset Care' }],
            image: vRepair,
          },
          {
            index: '04',
            title: 'Corporate Interior Solutions',
            description: 'Design-led, project-managed fitout solutions from concept to handover for corporate spaces.',
            tags: [{ label: 'Design & Build' }, { label: 'Retrofitting' }, { label: 'PMC' }],
            image: vInterior,
          },
        ],
      },
      statsStrip: [
        { value: '₹15,982 Cr', label: 'Group Revenue' },
        { value: '3.5 Lakh+', label: 'Employees' },
        { value: '16', label: 'Group Companies' },
        { value: '29', label: 'States' },
        { value: '320K+', label: 'Permanent Staff' },
      ],
      hardcoreRepair: {
        eyebrow: 'Core Activity',
        heading: 'Integrated Facility ',
        headingAccent: 'Management',
        body: 'Comprehensive infrastructure care encompassing engineering, preventive maintenance, repairs, refurbishment, MEP services, compliance, and lifecycle asset management.',
        sectorsHeading: 'Sectors We Operate',
        checklist: [
          { label: 'Corporate Offices' },
          { label: 'Healthcare Facilities' },
          { label: 'Manufacturing Facilities' },
          { label: 'Data Centers' },
          { label: 'Educational Campuses' },
        ],
        cta: 'Explore Facility Management',
        image: ifmImg,
        imageCaption: 'Integrated Facility Management',
        imageSubcaption: 'Engineering, Maintenance & Asset Care',
      },
      corporateInterior: {
        eyebrow: 'Infrastructure Care',
        heading: 'Infrastructure',
        headingAccent: 'Care',
        sectorsHeading: 'Sectors We Operate',
        body: 'Structural, civil & mechanical repair work by trained technicians — zero compromise on safety.',
        checklist: [
          { label: 'Engineering and Technical Services' },
          { label: 'Civil and Building Maintenance' },
          { label: 'Asset Care and Life cycle Management' },
          { label: 'Infrastructure Reliability' },
          { label: 'Sustainability services' },
        ],
        cta: 'Explore Infrastructure Care',
        image: infraImg,
        imageCaption: 'Infrastructure Care',
        imageSubcaption: 'Structural, Civil & Mechanical Services',
      },
      officeInterior: {
        eyebrow: 'Fitout Division',
        heading: 'Corporate Interior Solutions',
        headingAccent: 'Management',
        sectorsHeading: 'Sectors We Operate',
        body: 'Turnkey interiors, fit-outs, integrating innovative design, energy-efficient materials, and sustainable workplace solutions.',
        checklist: [
          { label: 'Concept design & space planning' },
          { label: 'Design & Build (D&B) execution' },
          { label: 'Furniture, fixtures & fit-out' },
          { label: 'IT & AV infrastructure integration' },
          { label: 'Civil upgrades & retrofitting' },
          { label: 'Handover, snagging & FM transition' },
        ],
        cta: 'Explore Interior Fitout & Management',
        image: interiorImg,
        imageCaption: 'Residential & Commercial',
        imageSubcaption: 'Full-Spectrum Property Ops',
        stats: [
          { value: '320K+', label: 'Permanent Staff' },
          { value: '630+', label: 'Districts' },
          { value: '368', label: 'Offices' },
        ],
      },
      propertyManagement: {
        eyebrow: 'Real Estate Management',
        heading: 'End-to-End',
        headingAccent: 'Property Management',
        sectorsHeading: 'Sectors We Operate',
        body: 'OneSIS delivers seamless property operations for residential condominiums and commercial assets — combining technology-driven oversight, trained on-site teams, and 24/7 owner visibility dashboards.',
        checklist: [
          { label: 'Corporate Campuses' },
          { label: 'Residential Condominiums' },
          { label: 'Retail Destinations' },
          { label: 'Logistics Parks' },
          { label: 'Mixed-Use Developments' },
        ],
        cta: 'Explore Property Management',
        image: pmImg,
        imageCaption: 'Residential & Commercial',
        imageSubcaption: 'Full-Spectrum Property Ops',
      },
      outcomes: {
        eyebrow: 'Value Framework',
        heading: [{ text: 'Four Outcomes' }],
        headingAccent: 'We Guarantee',
        body: 'These are not brand promises — they are contractual outcomes tied to measurable KPIs at every client site, every day of the year. Transform. Reduce. Enable. Enhance.',
        items: [
          { index: '01', title: 'Transform', description: 'Group Companies Managed and digitised last-mile operations across all service lines — driving operational excellence at scale.' },
          { index: '02', title: 'Reduce', description: 'Lower people costs and energy overhead through technology-led efficiencies and smart workforce scheduling.' },
          { index: '03', title: 'Enable', description: 'Business control and compliance management with real-time dashboards putting clients in full operational command.' },
          { index: '04', title: 'Enhance', description: 'Office experience and occupier satisfaction through best-in-class practices and continuous service benchmarking.' },
        ],
      },
      accountability: {
        eyebrow: 'The OneSIS Advantage',
        heading: 'Built for',
        headingAccent: 'Accountability',
        headingTail: 'at Every Level',
        body: 'We combine the strengths of transforming facilities into destinations that inspire wellbeing, elevate occupier experience, enhance developer experience, and create exceptional customer delight, with new benchmarks in operational excellence.',
        items: [
          { index: '01', title: 'Occupier Wellbeing', description: 'Creating healthier, safer, and more engaging workplaces where people thrive.' },
          { index: '02', title: 'Developer Experience', description: 'Protecting and enhancing asset value through proactive, transparent property management.' },
          { index: '03', title: 'Customer Delight', description: 'Delivering consistent service excellence that exceeds expectations at every touchpoint.' },
          { index: '04', title: 'Technology-Driven Excellence', description: 'Real-time visibility, intelligent insights, and data-driven decision-making for complete operational control.' },
          { index: '05', title: 'Operational Accountability', description: 'Measurable KPIs and uncompromising governance across every site.' },
          { index: '06', title: 'Sustainability & EHS', description: 'Driving responsible operations through energy efficiency, resource optimization, and sustainable practices.' },
        ],
      },
      whereWeOperate: {
        heading: 'Where We',
        headingAccent: 'Create Impact',
        body: 'Across corporate campuses, tech parks, commercial towers, residential society, hospitals, and retail chains - Wherever you are in India, OneSIS serves full accountability and real-time visibility that drives performance.',
      },
      technology: {
        eyebrow: 'Proprietary Tech',
        heading: 'Powered by',
        headingAccent: 'Intelligent',
        headingTail: 'Platforms',
        body: 'Our integrated digital stack gives clients real-time operational intelligence, automated compliance tracking, and full transparency — no black boxes, ever.',
        cta: 'Explore Technology',
        platforms: [
          { name: 'One Point App', tag: 'Field Operations', description: 'Mobile-first tool for field teams — task management, attendance, compliance checklists in one app.', highlighted: false },
          { name: 'iOPS', tag: 'Integrated Ops Platform', description: 'Central command dashboard for real-time facility monitoring, SLA tracking, and client reporting.', highlighted: false },
          { name: 'OneSIS FACTECH', tag: 'FM Platform', description: 'Comprehensive FM workflow automation — from ticket raising to preventive maintenance scheduling.', highlighted: true },
          { name: 'M-Trainer', tag: 'Workforce L&D', description: 'Proprietary digital learning platform ensuring consistent skill upgradation across 320K+ permanent staff.', highlighted: false },
        ],
      },
      cta: {
        eyebrow: 'Get Started',
        heading: 'Ready to',
        headingAccent: 'Transform',
        headingTail: 'Your Facility?',
        body: 'Talk to our team and discover how OneSIS can simplify your facility needs — FM, property management, asset Restoration & Maintenance and Workplace Interior Solutions — under one roof, with guaranteed SLAs.',
        primaryCta: 'Contact Our Team',
        secondaryCta: 'Download Profile',
        stats: [
          { value: '₹15,982 Cr', label: 'Group Revenue', highlighted: false },
          { value: '3.5L', label: 'Employees', highlighted: false },
          { value: '29', label: 'States', highlighted: true },
          { value: '16', label: 'Group Companies', highlighted: false },
        ],
      },
    },
  })
  console.log('✓ Home')

  // --- 4. Board Members ------------------------------------------------------
  await payload.delete({ collection: 'board-members', where: {} })
  const boardPhotos = await Promise.all([
    uploadLocal(payload, '/assests/board/riturajSir.jpg', 'Mr. Rituraj Kishore Sinha'),
    uploadLocal(payload, '/assests/board/dheerajSir.jpg', 'Mr. Dhiraj Singh'),
    uploadLocal(payload, '/assests/board/brijeshsir.jpg', 'Mr. Brajesh Kumar'),
  ])
  const boardData = [
    {
      name: 'Mr. Rituraj Kishore Sinha',
      title: 'Group Managing Director',
      bio: "Mr. Sinha has been serving as the Managing Director of the Company. He is an alumnus of the Doon School, and Leeds University Business School, United Kingdom. Since joining the SIS Group in 2002, he has played a vital role in driving the Company's exponential growth, leading it to become a Market leader in Security, Facility Management and Cash Logistics Solutions across India, Australia, Singapore and New Zealand.",
    },
    {
      name: 'Mr. Dhiraj Singh',
      title: 'Chief Executive Officer',
      bio: 'Mr. Dhiraj prior to joining SIS Group Enterprises, he successfully established and led several startup businesses in the infrastructure and services sectors. After completing his Mechanical Engineering from IIT Mumbai and MBA and MIM from Tulane and Thunderbird respectively in the USA, he worked with companies like Eicher, Laitram, Tata Steel and Bechtel.',
    },
    {
      name: 'Mr. Brajesh Kumar',
      title: 'Chief Financial Officer (CFO)',
      bio: 'Mr. Brajesh, a qualified CA, worked as Proprietor/Partner of M/s P.B. and Co, Chartered Accountants and Partner of M/s S.K.Nayak and Co with 10 years of experience in Audit, Accounting, Taxation and Company Law Matters.',
    },
  ]
  for (let i = 0; i < boardData.length; i++) {
    await payload.create({
      collection: 'board-members',
      data: { ...boardData[i], photo: boardPhotos[i] as number, order: i },
    })
  }
  console.log('✓ Board Members (3)')

  await payload.updateGlobal({
    slug: 'company-board-page',
    data: {
      banner: await uploadLocal(payload, '/assests/board/About_OneSIS_Banner.png', 'Board of Directors'),
      eyebrow: 'Company',
      heading: 'Board of Directors',
      body: "Governance and leadership guiding OneSIS's strategy, accountability, and long-term growth.",
    },
  })
  console.log('✓ Board page intro')

  // --- 5. Management Team (photos are placeholders — swap via admin panel) --
  await payload.delete({ collection: 'management-team', where: {} })
  const mgmtNames = [
    { name: 'Karan Mehta', title: 'Chief Executive Officer' },
    { name: 'Priya Iyer', title: 'Chief Operating Officer' },
    { name: 'Rohan Gupta', title: 'Chief Financial Officer' },
    { name: 'Neha Verma', title: 'Chief Human Resources Officer' },
    { name: 'Sanjay Patel', title: 'Chief Technology Officer' },
    { name: 'Divya Menon', title: 'VP, Operations' },
  ]
  for (let i = 0; i < mgmtNames.length; i++) {
    const photo = await uploadLocal(payload, '/assests/company/team.jpg', mgmtNames[i].name)
    await payload.create({
      collection: 'management-team',
      data: { ...mgmtNames[i], photo: photo as number, order: i },
    })
  }
  console.log('✓ Management Team (6, placeholder photo — replace via admin panel)')

  await payload.updateGlobal({
    slug: 'company-management-page',
    data: {
      banner: await uploadLocal(payload, '/assests/company/management/Management_Team_Banner.png', 'Management Team'),
      eyebrow: 'Company',
      heading: 'Management Team',
      body: 'Meet the leadership team driving OneSIS operations, technology, and growth.',
    },
  })
  console.log('✓ Management page intro')

  // --- 6. News Items (upgraded from tag-list to structured articles) --------
  await payload.delete({ collection: 'news-items', where: {} })
  const newsSeed: Array<{ title: string; category: 'media-coverage' | 'industry-insights' | 'awards'; summary: string }> = [
    { title: 'OneSIS featured in industry FM rankings', category: 'media-coverage', summary: 'Coverage of OneSIS in national facility management industry rankings.' },
    { title: 'CXO interview: the future of Group Companies Managed FM', category: 'media-coverage', summary: 'Leadership interview on integrated facility management trends.' },
    { title: 'Facility Management trends to watch', category: 'industry-insights', summary: 'A look at emerging trends shaping the FM sector in India.' },
    { title: 'Smart buildings and sustainability in FM', category: 'industry-insights', summary: 'How smart building technology is reshaping sustainability practices.' },
    { title: 'ISO 9001:2015 Certification', category: 'awards', summary: 'OneSIS certified for quality management systems.' },
    { title: 'ISO 14001:2015 & OHSAS 18001 Certification', category: 'awards', summary: 'Recognized for environmental management and occupational health & safety standards.' },
  ]
  for (const item of newsSeed) {
    await payload.create({
      collection: 'news-items',
      data: {
        ...item,
        slug: item.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        publishedDate: new Date().toISOString(),
      },
      draft: false,
    })
  }
  console.log('✓ News Items (6)')

  await payload.updateGlobal({
    slug: 'company-news-page',
    data: {
      banner: await uploadLocal(payload, '/assests/company/news-media/News_Banner.png', 'News & Media'),
      eyebrow: 'Company',
      heading: 'News & Media',
      body: 'Press releases, media coverage, industry insights, and awards & recognition from OneSIS.',
    },
  })
  console.log('✓ News page intro')

  // --- 7. Training Programs ----------------------------------------------
  await payload.delete({ collection: 'training-programs', where: {} })
  const trainingSeed = [
    { title: 'Functional Training', description: 'Role-specific operational training for site staff across FM, security, and technical roles.', img: '/assests/homepage/repair-spotlight.jpg' },
    { title: 'Technical Training', description: 'MEP, engineering, and asset care skill-building for technical teams.', img: '/assests/homepage/property-spotlight.jpg' },
    { title: 'Soft Skills Training', description: 'Communication, customer service, and supervisory skills for client-facing staff.', img: '/assests/homepage/operate-one.jpg' },
  ]
  for (let i = 0; i < trainingSeed.length; i++) {
    const t = trainingSeed[i]
    const image = await uploadLocal(payload, t.img, t.title)
    await payload.create({
      collection: 'training-programs',
      data: { title: t.title, description: t.description, image: image as number, order: i },
    })
  }
  console.log('✓ Training Programs (3)')

  await payload.updateGlobal({
    slug: 'company-training-page',
    data: {
      banner: await uploadLocal(payload, '/assests/company/training-development/Training_Development_Banner.png', 'Training & Development'),
      eyebrow: 'Company',
      heading: 'Training & Development',
      body: 'Continuous skill development across 320K+ permanent staff through M-Trainer, our proprietary digital learning platform.',
      platformFeatures: [
        { label: 'Mobile-first learning modules' },
        { label: 'Role-based certification tracking' },
        { label: 'Multi-language content delivery' },
      ],
    },
  })
  console.log('✓ Training page intro')

  // --- 8. Job Openings ------------------------------------------------------
  await payload.delete({ collection: 'job-openings', where: {} })
  const jobsSeed = [
    { title: 'Facility Manager', department: 'Operations', location: 'Mumbai', experience: '5–8 yrs' },
    { title: 'MEP Technician', department: 'Technical', location: 'Bangalore', experience: '2–4 yrs' },
    { title: 'Security Supervisor', department: 'Security', location: 'Delhi NCR', experience: '3–5 yrs' },
    { title: 'HR Executive', department: 'Corporate', location: 'Kolkata', experience: '2–4 yrs' },
    { title: 'Housekeeping Supervisor', department: 'Operations', location: 'Pune', experience: '2–4 yrs' },
    { title: 'Business Development Manager', department: 'Corporate', location: 'Mumbai', experience: '6–9 yrs' },
    { title: 'Electrical Engineer', department: 'Technical', location: 'Chennai', experience: '3–6 yrs' },
    { title: 'Site Safety Officer', department: 'EHS', location: 'Hyderabad', experience: '4–7 yrs' },
  ]
  for (const job of jobsSeed) {
    await payload.create({
      collection: 'job-openings',
      data: { ...job, type: 'full-time', isActive: true },
    })
  }
  console.log('✓ Job Openings (8)')

  await payload.updateGlobal({
    slug: 'career-current-openings-page',
    data: {
      banner: await uploadLocal(payload, '/assests/career/current-openings/Current_Openings_Banner.png', 'Current Openings'),
      eyebrow: 'Career',
      heading: 'Current Openings',
      body: 'Explore open roles across operations, technical, security, and corporate teams.',
    },
  })
  console.log('✓ Current Openings page intro')

  // --- 9. Career > Employee Benefits ----------------------------------------
  await payload.updateGlobal({
    slug: 'career-employee-benefits',
    data: {
      banner: await uploadLocal(payload, '/assests/career/employee-benefits/Employee_Benefits_Banner.png', 'Employee Benefits'),
      eyebrow: 'Career',
      heading: 'Employee Benefits',
      body: 'Comprehensive benefits supporting our workforce across India.',
      benefits: [
        { title: 'Health Insurance', description: 'Group medical coverage for employees and dependents.' },
        { title: 'Skill Development', description: 'Access to M-Trainer, our proprietary L&D platform.' },
      ],
    },
  })
  console.log('✓ Career pages')

  console.log('\n✅ Seed complete.')
  process.exit(0)
}

await seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
