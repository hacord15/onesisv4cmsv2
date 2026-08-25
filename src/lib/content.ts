// Central copy source for the OneSIS marketing site.
// Keeping content here (instead of scattered inline in JSX) makes it easy
// to hand this file to a non-developer for copy edits later.

export const nav = {
  logo: "OneSIS",
  parentBadge: "SIS Group Co.",
  cta: "Company Profile",
  links: [
    // {
    //   label: "HOME",
    //   href: "/",
    // },
    {
      label: "COMPANY",
      href: "/company/onesis",
      children: [
        { label: "About SIS Group", href: "/company/sis-group" },
        { label: "About OneSIS", href: "/company/onesis" },
        { label: "Board", href: "/company/board" },
        { label: "Management Team", href: "/company/management" },
        { label: "Why OneSIS", href: "/company/why-onesis" },
        { label: "News", href: "/company/news" },
        { label: "Training", href: "/company/training" },
      ],
    },
    {
      label: "SOLUTIONS",
      href: "#",
      children: [
        { label: "Integrated Facility Management ", href: "/solutions/integrated-fm" },

        {
          label: "Property Management",
          href: "/solutions/property-management",
        },
        {
          label: "Infrastructure Care",
          href: "/solutions/infrastructure-care",
        },
        {
          label: "Corporate Interior Solutions",
          href: "/solutions/corporate-interior-solutions",
        },
      ],
    },
    {
      label: "CAREER",
      href: "/career/current-openings",
      children: [
        { label: "Why Work With Us", href: "/career/why-work-with-us" },
        { label: "Current Openings", href: "/career/current-openings" },
        { label: "Employee Benefits", href: "/career/employee-benefits" },
      ],
    },
    {
      label: "CONTACT US",
      href: "/contact/contact-form",
      children: [
        { label: "Become a Partner", href: "/contact/partnership-form" },
        { label: "Presence Map", href: "/contact/presence-map" },
        { label: "Contact Form", href: "/contact/contact-form" },
      ],
    },
  ],
};

export const anchorStrip = [
  "Integrated Facility Management",
  "Property Management",
  "Infrastructure Care",
  "Corporate Interior Solutions",
  
];

export const hero = {
  eyebrow: "One Vision, Infinite Solution",
  heading: ["Reimagining Workplace Solutions", " for Modern India. "],
  headingAccent: "Integrated Facility Management",
  body: "Technology-driven, fully Group Companies Managed facility solutions — FM, property management, hardcore repair & maintenance, and office fitouts — backed by SIS Group's ₹15,982 Cr enterprise strength.",
  primaryCta: "Explore Solutions",
  secondaryCta: "Download Company Profile",
  scrollLabel: "Scroll to Explore",
  stats: [
    { value: "₹15,982 Cr", label: "Annual Turnover" },
    { value: "3.5 Lakh+", label: "Workforce Strength" },
    { value: "29 States", label: "Pan-India Presence" },
    { value: "320K+", label: "Sites Managed" },
  ],
};

export const about = {
  eyebrow: "About OneSIS",
  heading: ["Reimagining Facilities for", ""],
  headingAccent: "Modern India",
  body: "Born with a vision to redefine Integrated Facility Management & Property Management, OneSIS combines the strength of the SIS Group's legacy with next-generation technology and operational excellence.To create healthier workplaces, enhance occupier experience, and deliver customer delight through seamless, self-performed service model, through Group companies, ensuring complete accountability, consistent quality, and measurable business outcomes.",
  badges: [
    "Group Companies Managed",
    "Technology-First",
    "SIS Group Backup",
    "SLA Guaranteed",
    "Pan-India Presence",
    "End-to-End Solutions",
  ],
  facts: [
    { value: "2024", label: "Established, India" },
    { value: "100%", label: "SIS Ltd Subsidiary" },
    { value: "₹15,982 Cr", label: "SIS Group Revenue" },
    { value: "3.5 Lakh", label: "SIS Group Employees" },
    { value: "16", label: "SIS Group Companies" },
    { value: "790", label: "Districts" },
  ],
  imageCaption: "Residential & Commercial",
};

export const verticals = {
  eyebrow: "What We Offer",
  heading: ["Four Core Verticals,"],
  headingAccent: "One Accountable Partner",
  body: "Whether you need day-to-day facility upkeep, end-to-end property management, critical mechanical repairs, or a complete office interior transformation — OneSIS owns every outcome under a single agreement.",
  items: [
    {
      index: "01",
      title: "Integrated Facility Management",
      description:
        "End-to-end FM under a single agreement — eliminating multi-vendor complexity across every site.",
      tags: ["Soft Services", "MEP", "EHS", "Security", "Horticulture"],
      image: "verticalIntegratedFM",
    },
    {
      index: "02",
      title: "Property Management",
      description:
        "Commercial & Residential  property operations with full owner occupant and transparency  satisfaction.",
      tags: ["Commercial","Residential", "Mall Management"],
      image: "verticalPropertyMgmt",
    },
    {
      index: "03",
      title: "Infrastructure Care",
      description:
        "Structural, civil & mechanical repair work by trained technicians — zero compromise on safety.",
      tags: ["Infrastructure Reliability ", "Sustainability services","Asset Care"],
      image: "verticalHardcoreRepair",
    },
    {
      index: "04",
      title: "Corporate Interior Solutions",
      description:
        "Design-led, project-managed fitout solutions from concept to handover for corporate spaces.",
      tags: ["Design & Build", "Retrofitting", "PMC"],
      image: "verticalOfficeInterior",
    },
  ],
};

export const statsStrip = [
  { value: "₹15,982 Cr", label: "Group Revenue" },
  { value: "3.5 Lakh+", label: "Employees" },
  { value: "16", label: "Group Companies" },
  { value: "29", label: "States" },
  { value: "320K+", label: "Permanent Staff" },
];

export const hardcoreRepair = {
  eyebrow: "Core Activity",
  heading: "Integrated Facility ",
  headingAccent: "Management",
  body: "Comprehensive infrastructure care encompassing engineering, preventive maintenance, repairs, refurbishment, MEP services, compliance, and lifecycle asset management.",
  sectorsHeading: "Sectors We Operate",
  checklist:  [
  "Corporate Offices",
  "Healthcare Facilities",
  "Manufacturing Facilities",
  "Data Centers",
  "Educational Campuses",
],
  cta: "Explore Facility Management",
  imageCaption: "Integrated Facility Management",
  imageSubcaption: "Engineering, Maintenance & Asset Care",

};

export const corporateInterior = {
  eyebrow: "Infrastructure Care",
  heading: "Infrastructure",
  headingAccent: "Care",
    sectorsHeading: "Sectors We Operate",

  body: "Structural, civil & mechanical repair work by trained technicians — zero compromise on safety.",
  checklist: [
    "Engineering and Technical Services",
    "Civil and Building Maintenance",
    "Asset Care and Life cycle Management",
    "Infrastructure Reliability ",
    "Sustainability services"
  ],
  cta: "Explore Infrastructure Care",
  imageCaption: "Infrastructure Care",
  imageSubcaption: "Structural, Civil & Mechanical Services",
};

export const officeInterior = {
  eyebrow: "Fitout Division",
  heading: "Corporate Interior Solutions",
  headingAccent: "Management",
    sectorsHeading: "Sectors We Operate",

  body: "Turnkey interiors, fit-outs, integrating innovative design, energy-efficient materials, and sustainable workplace solutions.",
  checklist: [
    "Concept design & space planning",
    "Design & Build (D&B) execution",
    "Furniture, fixtures & fit-out",
    "IT & AV infrastructure integration",
    "Civil upgrades & retrofitting",
    "Handover, snagging & FM transition",
  ],
    cta: "Explore Interior Fitout & Management",
      imageCaption: "Residential & Commercial",
  imageSubcaption: "Full-Spectrum Property Ops",
  stats: [
    { value: "320K+", label: "Permanent Staff" },
    { value: "630+", label: "Districts" },
    { value: "368", label: "Offices" },
  ],
};


export const propertyManagement = {
  eyebrow: "Real Estate Management",
  heading: "End-to-End",
  headingAccent: "Property Management",
    sectorsHeading: "Sectors We Operate",

  body: "OneSIS delivers seamless property operations for residential condominiums and commercial assets — combining technology-driven oversight, trained on-site teams, and 24/7 owner visibility dashboards.",
  checklist: [
  "Corporate Campuses",
  "Residential Condominiums",
  "Retail Destinations",
  "Logistics Parks",
  "Mixed-Use Developments",
],
  cta: "Explore Property Management",
  imageCaption: "Residential & Commercial",
  imageSubcaption: "Full-Spectrum Property Ops",
};



// export const officeInterior = {
//   eyebrow: "Real Estate Management",
//   heading: "End-to-End",
//   headingAccent: "Property Management",
//   body: "OneSIS delivers seamless property operations for residential complexes and commercial assets — combining technology-driven oversight, trained on-site teams, and 24/7 owner visibility dashboards.",
//   checklist: [
//     "Residential society & tower management",
//     "Commercial office & retail property operations",
//     "Vendor & contractor coordination",
//     "Asset lifecycle tracking & compliance",
//     "Occupant experience management",
//     "Real-time owner dashboards & reporting",
//   ],
//   cta: "Explore Property Management",
//   imageCaption: "Residential & Commercial",
//   imageSubcaption: "Full-Spectrum Property Ops",
// };

// export const propertyManagement = {
//   eyebrow: "Fitout Division",
//   heading: "Workplace Interior Solutions",
//   headingAccent: "Management",
//   body: "Turnkey interiors, fit-outs, integrating innovative design, energy-efficient materials, and sustainable workplace solutions.",
//   checklist: [
//     "Concept design & space planning",
//     "Design & Build (D&B) execution",
//     "Furniture, fixtures & fit-out",
//     "IT & AV infrastructure integration",
//     "Civil upgrades & retrofitting",
//     "Handover, snagging & FM transition",
//   ],
//   stats: [
//     { value: "320K+", label: "Permanent Staff" },
//     { value: "630+", label: "Districts" },
//     { value: "368", label: "Offices" },
//   ],
// };


export const testimonials = {
  eyebrow: "Client Voices",
  heading: ["What Our"],
  headingAccent: "Clients Say",
  body: "Real feedback from the facility owners, developers, and corporate teams who trust OneSIS with their operations every day.",
  items: [
    {
      quote:
        "OneSIS transformed how we manage our commercial campus. Response times dropped dramatically and the reporting dashboards give us real visibility we never had before.",
      name: "Anil Kapoor",
      title: "Head of Admin",
      company: "Tech Park, Bengaluru",
      rating: 5,
    },
    {
      quote:
        "Onboarding a single accountable partner for FM, security, and maintenance under one SLA has cut our vendor management overhead in half.",
      name: "Meera Shah",
      title: "General Manager",
      company: "Retail Mall, Mumbai",
      rating: 5,
    },
    {
      quote:
        "The compliance and EHS audit trail alone justified the switch. OneSIS brought a level of documentation and accountability our previous vendors never matched.",
      name: "Rajesh Nair",
      title: "Facilities Director",
      company: "Corporate Campus, Pune",
      rating: 5,
    },
    {
      quote:
        "Their team handled a full interior fit-out and the transition to ongoing FM without a single day of disruption to our operations.",
      name: "Sunita Rao",
      title: "VP Operations",
      company: "Manufacturing Facility, Chennai",
      rating: 4,
    },
  ],
};

export const outcomes = {
  eyebrow: "Value Framework",
  heading: ["Four Outcomes"],
  headingAccent: "We Guarantee",
  body: "These are not brand promises — they are contractual outcomes tied to measurable KPIs at every client site, every day of the year. Transform. Reduce. Enable. Enhance.",
  items: [
    {
      index: "01",
      title: "Transform",
      description:
        "Group Companies Managed and digitised last-mile operations across all service lines — driving operational excellence at scale.",
    },
    {
      index: "02",
      title: "Reduce",
      description:
        "Lower people costs and energy overhead through technology-led efficiencies and smart workforce scheduling.",
    },
    {
      index: "03",
      title: "Enable",
      description:
        "Business control and compliance management with real-time dashboards putting clients in full operational command.",
    },
    {
      index: "04",
      title: "Enhance",
      description:
        "Office experience and occupier satisfaction through best-in-class practices and continuous service benchmarking.",
    },
  ],
};

export const accountability = {
  eyebrow: "The OneSIS Advantage",
  heading: "Built for",
  headingAccent: "Accountability",
  headingTail: "at Every Level",
  body: "We combine the strengths of transforming facilities into destinations that inspire wellbeing, elevate occupier experience, enhance developer experience, and create exceptional customer delight, with new benchmarks in operational excellence.",
  items: [
    {
      index: "01",
      title: "Occupier Wellbeing",
      description:
        "Creating healthier, safer, and more engaging workplaces where people thrive.",
    },
    {
      index: "02",
      title: "Developer Experience",
      description:
        "Protecting and enhancing asset value through proactive, transparent property management.",
    },
    {
      index: "03",
      title: "Customer Delight",
      description:
        "Delivering consistent service excellence that exceeds expectations at every touchpoint.",
    },
    {
      index: "04",
      title: "Technology-Driven Excellence",
      description:
        "Real-time visibility, intelligent insights, and data-driven decision-making for complete operational control.",
    },
    {
      index: "05",
      title: "Operational Accountability",
      description:
        "Measurable KPIs and uncompromising governance across every site.",
    },
    {
      index: "06",
      title: "Sustainability & EHS",
      description:
        "Driving responsible operations through energy efficiency, resource optimization, and sustainable practices.",
    },
  ],
};

export const whereWeOperate = {
  heading: "Where We",
  headingAccent: "Create Impact",
  body: "Across corporate campuses, tech parks, commercial towers, residential society, hospitals, and retail chains - Wherever you are in India, OneSIS serves full accountability and real-time visibility that drives performance.",
};

export const technology = {
  eyebrow: "Proprietary Tech",
  heading: "Powered by",
  headingAccent: "Intelligent",
  headingTail: "Platforms",
  body: "Our integrated digital stack gives clients real-time operational intelligence, automated compliance tracking, and full transparency — no black boxes, ever.",
  cta: "Explore Technology",
  platforms: [
    {
      name: "One Point App",
      tag: "Field Operations",
      description:
        "Mobile-first tool for field teams — task management, attendance, compliance checklists in one app.",
      highlighted: false,
    },
    {
      name: "iOPS",
      tag: "Integrated Ops Platform",
      description:
        "Central command dashboard for real-time facility monitoring, SLA tracking, and client reporting.",
      highlighted: false,
    },
    {
      name: "OneSIS FACTECH",
      tag: "FM Platform",
      description:
        "Comprehensive FM workflow automation — from ticket raising to preventive maintenance scheduling.",
      highlighted: true,
    },
    {
      name: "M-Trainer",
      tag: "Workforce L&D",
      description:
        "Proprietary digital learning platform ensuring consistent skill upgradation across 320K+ permanent staff.",
      highlighted: false,
    },
  ],
};

export const cta = {
  eyebrow: "Get Started",
  heading: "Ready to",
  headingAccent: "Transform",
  headingTail: "Your Facility?",
  body: "Talk to our team and discover how OneSIS can simplify your facility needs — FM, property management, asset Restoration & Maintenance and Workplace Interior Solutions — under one roof, with guaranteed SLAs.",
  primaryCta: "Contact Our Team",
  secondaryCta: "Download Profile",
  stats: [
    { value: "₹15,982 Cr", label: "Group Revenue", highlighted: false },
    { value: "3.5L", label: "Employees", highlighted: false },
    { value: "29", label: "States", highlighted: true },
    { value: "16", label: "Group Companies", highlighted: false },
  ],
};

export const footer = {
  description:
    "A SIS Group company delivering technology-driven, group managed integrated facility management, real estate services, hardcore repair & maintenance, and office interior management across India.",
  badge: "Part of SIS Group — India's #1 FM Company",
 columns: [
  {
    title: "Company",
    links: [
      { label: "About SIS Group", href: "/company/sis-group" },
      { label: "About OneSIS", href: "/company/onesis" },
      { label: "Board & Management", href: "/company/board" },
      { label: "Why OneSIS", href: "/company/why-onesis" },
      { label: "News & Updates", href: "/company/news" },
    ],
  },
  {
    title: "Solutions",
    links: [
      {
        label: "Integrated Facility Management",
        href: "/solutions/integrated-fm",
      },
      {
        label: "Property Management",
        href: "/solutions/property-management",
      },
      {
        label: "Infrastructure Care",
        href: "/solutions/infrastructure-care",
      },
      {
        label: "Corporate Interior Solutions",
        href: "/solutions/corporate-interior-solutions",
      },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/career/current-openings" },
      { label: "Download Profile", href: "/download-profile" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
],
  social: [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/onesis/",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/onesis",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/onesis/",
  },
],
copyright: "© 2024 OneSIS. A SIS Ltd Company. All rights reserved.",
};
