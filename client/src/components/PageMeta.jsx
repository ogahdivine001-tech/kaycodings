import { useEffect } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
import { projects } from '../lib/workData.js'

// Sets the browser tab title and descriptions for every page.
const HOME_TITLE = 'Kaycodings | Digital solutions for businesses ready to grow'

const staticMeta = {
  '/': {
    title: HOME_TITLE,
    description: 'Kaycodings designs and builds websites, products and brand systems for businesses ready to grow.'
  },
  '/services': {
    title: 'Services',
    description: 'Web design and development, UI/UX, branding, e-commerce, digital products and AI tools for growing businesses.'
  },
  '/services/web-design': {
    title: 'Web Design and Development',
    description: 'Fast, well designed websites and web apps built to turn visitors into customers.'
  },
  '/work': {
    title: 'My Work',
    description: 'Websites, e-commerce stores and digital products built by Kaycodings.'
  },
  '/work/case-studies': {
    title: 'Case Studies',
    description: 'A closer look at the problem, the approach and the outcome behind selected projects.'
  },
  '/about': {
    title: 'About',
    description: 'Kaycodings is a one person web development and design studio based in Lagos, Nigeria.'
  },
  '/admin': { title: 'Admin', description: 'Private dashboard.', hidden: true },
  '/contact': {
    title: 'Start a Project',
    description: 'Tell me about your business and what you need. You will hear back within one business day.'
  }
}

function resolve(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  if (staticMeta[path]) return { ...staticMeta[path], found: !staticMeta[path].hidden }

  const project = matchPath('/work/:category/:slug', path)
  if (project) {
    const group = projects[project.params.category]
    const item = group?.items.find((p) => p.slug === project.params.slug)
    if (item) return { title: item.name, description: item.desc, found: true }
  }

  const category = matchPath('/work/:category', path)
  if (category && projects[category.params.category]) {
    const group = projects[category.params.category]
    return { title: group.heading, description: `${group.heading} by Kaycodings.`, found: true }
  }

  return { title: 'Page not found', description: 'The page you are looking for does not exist.', found: false }
}

function setMeta(selector, attr, value, create) {
  let el = document.head.querySelector(selector)
  if (!el && create) {
    el = document.createElement('meta')
    create(el)
    document.head.appendChild(el)
  }
  if (el) el.setAttribute(attr, value)
}

export default function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = resolve(pathname)
    const title = meta.title === HOME_TITLE || meta.title.includes('Kaycodings') ? meta.title : `${meta.title} | Kaycodings`
    document.title = title

    setMeta('meta[name="description"]', 'content', meta.description, (el) => el.setAttribute('name', 'description'))
    setMeta('meta[property="og:title"]', 'content', title, (el) => el.setAttribute('property', 'og:title'))
    setMeta('meta[property="og:description"]', 'content', meta.description, (el) => el.setAttribute('property', 'og:description'))
    setMeta('meta[property="og:url"]', 'content', window.location.href, (el) => el.setAttribute('property', 'og:url'))
    setMeta('meta[name="twitter:title"]', 'content', title, (el) => el.setAttribute('name', 'twitter:title'))
    setMeta('meta[name="twitter:description"]', 'content', meta.description, (el) => el.setAttribute('name', 'twitter:description'))
    setMeta('meta[name="robots"]', 'content', meta.found ? 'index,follow' : 'noindex', (el) => el.setAttribute('name', 'robots'))
  }, [pathname])

  return null
}
