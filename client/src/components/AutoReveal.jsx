import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Adds scroll-in animations to every page without touching each component:
// sections fade up as they enter the screen, and cards in grids and lists stagger in.
// Also scrolls to the top when the page changes. Respects reduced-motion settings.
const isGroup = (el) =>
  el.classList.contains('grid') ||
  el.classList.contains('flex-wrap') ||
  [...el.classList].some((c) => c.startsWith('space-y'))

export default function AutoReveal() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useLayoutEffect(() => {
    const main = document.querySelector('main')
    if (!main || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const seen = new WeakSet()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          io.unobserve(el)
          el.setAttribute('data-rv', 'in')
          const delay = parseInt(el.style.getPropertyValue('--rv-delay'), 10) || 0
          setTimeout(() => {
            el.removeAttribute('data-rv')
            el.style.removeProperty('--rv-delay')
          }, delay + 1000)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )

    const mark = (el, delay) => {
      if (seen.has(el)) return
      seen.add(el)
      el.setAttribute('data-rv', 'out')
      el.style.setProperty('--rv-delay', `${delay}ms`)
      io.observe(el)
    }

    const stagger = (i) => Math.min(i * 80, 480)

    const scan = () => {
      main.querySelectorAll('section').forEach((sec) => {
        if (sec.hasAttribute('data-no-rv') || sec.closest('[data-no-rv]')) return
        const container =
          [...sec.children].find((c) => c.classList.contains('container-content')) || sec
        const stack = isGroup(container) && container !== sec
        ;[...container.children].forEach((el, i) => {
          if (isGroup(el)) {
            ;[...el.children].forEach((child, j) => mark(child, stagger(j)))
          } else {
            mark(el, stack ? stagger(i) : 0)
          }
        })
      })
    }

    scan()
    const mo = new MutationObserver(scan)
    mo.observe(main, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
      main.querySelectorAll('[data-rv]').forEach((el) => {
        el.removeAttribute('data-rv')
        el.style.removeProperty('--rv-delay')
      })
    }
  }, [])

  return null
}