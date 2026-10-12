// All entries below are SAMPLE content. Replace with real projects as they are completed.
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const withSlugs = (items) => items.map((i) => ({ ...i, slug: slugify(i.name) }))

export const categories = [
  {
    slug: 'web-design',
    title: 'Web Design and Development Portfolio',
    blurb: 'Websites and web apps built to turn visitors into customers. See some of my previous works.',
    button: 'View Web Design Portfolio',
    to: '/work/web-design'
  },
  {
    slug: 'branding',
    title: 'Branding and Design Portfolio',
    blurb: 'Logos, color systems, and visual identities that tell your business story consistently everywhere.',
    button: 'View My Design Portfolio',
    to: '/work/branding'
  },
  {
    slug: 'digital-products',
    title: 'Digital Products and AI Portfolio',
    blurb: 'Custom platforms, e-commerce builds, and AI-powered tools designed around a specific business problem.',
    button: 'View Product Portfolio',
    to: '/work/digital-products'
  },
  {
    slug: 'case-studies',
    title: 'Case Studies',
    blurb: 'A closer look at the problem, the approach, and the outcome behind selected projects.',
    button: 'View Case Studies',
    to: '/work/case-studies'
  }
]

export const projects = {
  'web-design': {
    heading: 'Web Design Portfolio',
    label: 'website development',
    items: withSlugs([
      {
        name: 'Savora Kitchen',
        desc: 'Restaurant website built around full-bleed food photography, with opening hours, a menu, a gallery, and a clear Order Now button.',
        industry: 'Restaurant',
        liveUrl: 'https://savora-kitchen-resta-oo5g.bolt.host',
        objective: 'A restaurant website that lets the food do the talking. The first screen shows whether the kitchen is open today, then leads visitors straight to the menu or to ordering.',
        outcome: 'A warm, image-led homepage with a simple route to the menu, gallery, and ordering from the very first screen.'
      },
      {
        name: 'PrimeHomes',
        desc: 'Real estate website with property search by location, type and status, agent and service pages, and a Book Inspection flow.',
        industry: 'Real estate',
        liveUrl: 'https://primehomesestate.vercel.app',
        objective: 'A property website for buyers who want to search quickly and book a viewing. Search sits right on the hero, with agents, services, and a blog one click away.',
        outcome: 'Visitors can filter properties by location, type, and status immediately, and book an inspection without leaving the site.'
      },
      {
        name: 'Sacred Touch Schools',
        desc: 'School website covering academics, admissions, gallery, news, events and staff, with parent and student portal access.',
        industry: 'Education',
        liveUrl: 'https://sacredtouchschools.vercel.app',
        objective: 'A school website that gives parents everything in one place: how the school teaches, how to apply, what is happening, and a way into the portals.',
        outcome: 'A clear structure for admissions, academics, news, and events, with an Apply for Admission call to action on the first screen.'
      },
      {
        name: 'Verve',
        desc: 'E-commerce storefront for electronics, fashion, beauty and home goods, with search, wishlist, cart and account access.',
        industry: 'E-commerce',
        liveUrl: 'https://vervestore.vercel.app',
        objective: 'A clean, product-led storefront where shoppers can search, save favourites, and move from browsing to checkout quickly.',
        outcome: 'A homepage that leads with products, with search, wishlist, cart, and account within reach in the header.'
      }
    ])
  },
  branding: {
    sample: true,
    heading: 'Branding and Design Portfolio',
    label: 'branding and design',
    items: withSlugs([
      {
        name: 'Lumen Studio',
        desc: 'Logo mark, color palette, and social templates for a photography studio.',
        industry: 'Photography',
        objective: 'Lumen Studio wanted a mark and palette that felt premium but stayed out of the way of the photographs.',
        outcome: 'A simple logo, a restrained palette, and ready to use social templates keep every post consistent.'
      },
      {
        name: 'Kora Foods',
        desc: 'Full identity system including menu design and packaging labels.',
        industry: 'Food',
        objective: 'Kora Foods needed one identity that worked across the menu, packaging, signage, and social media.',
        outcome: 'A complete identity system with guidelines the team can follow without needing a designer each time.'
      },
      {
        name: 'Peak Fitness',
        desc: 'Bold identity and signage direction for a new gym launch.',
        industry: 'Fitness',
        objective: 'Peak Fitness wanted a confident, energetic look that would stand out from other gyms nearby at launch.',
        outcome: 'A bold mark and color system that carries across signage, uniforms, and the website.'
      }
    ])
  },
  'digital-products': {
    heading: 'Digital Products and AI Portfolio',
    label: 'digital product',
    items: withSlugs([
      {
        name: 'BusinessHub',
        desc: 'Platform for small businesses to build an online presence, manage customers, create invoices, and showcase products in one place.',
        industry: 'Business software',
        liveUrl: 'https://businesshubng.vercel.app',
        objective: 'A single workspace for small businesses: an online presence, customer records, invoicing, and a product showcase, with a free trial to get started.',
        outcome: 'A focused landing page that shows invoices and storefronts in action and leads straight to a free start.'
      },
      {
        name: 'Verve',
        desc: 'E-commerce platform for electronics, fashion, beauty and home goods, built end to end from storefront to checkout.',
        industry: 'E-commerce',
        liveUrl: 'https://vervestore.vercel.app',
        objective: 'A full online store rather than a brochure site, covering product browsing, search, wishlist, cart, and account in one build.',
        outcome: 'Shoppers get a smooth path from discovering a product to checking out, on desktop and mobile.'
      }
    ])
  }
}

export const caseStudies = [
  {
    slug: 'sample-one',
    title: 'Redesigning a booking flow for a photography studio',
    excerpt: 'How a simpler booking journey and a faster gallery changed the way new clients enquired. About the client: a small studio that relied on direct messages for every booking.',
    client: 'Lumen Studio',
    tag: 'Web design'
  },
  {
    slug: 'sample-two',
    title: 'Moving a local grocery brand online',
    excerpt: 'From paper orders to a working storefront with payments and stock tracking. About the client: a neighborhood grocery brand ready to reach more customers.',
    client: 'Bright Grocers',
    tag: 'E-commerce'
  },
  {
    slug: 'sample-three',
    title: 'A calmer, clearer site for a healthcare provider',
    excerpt: 'Reorganizing information so patients could find services and request appointments without calling. About the client: a clinic with a growing patient base.',
    client: 'Northfield Clinic',
    tag: 'Brand and web'
  }
]
