import { useReducedMotion } from 'framer-motion'
import { clients } from '../lib/clients.js'

const placeholders = ['Client One', 'Client Two', 'Client Three', 'Client Four', 'Client Five']

// Each half of the scrolling strip holds at least this many items, so it always fills the screen
const MIN_PER_HALF = 8

function ClientLogo({ c, index }) {
  const float = { animationDelay: `${index * 0.7}s` }

  const inner = c.logo ? (
    <>
      <img
        src={c.logo}
        alt={c.showName ? '' : c.name}
        loading="lazy"
        style={float}
        className={`logo-float ${
          c.original
            ? 'h-11 w-11 rounded-xl object-contain ring-1 ring-white/15'
            : 'h-8 w-auto max-w-[140px] object-contain brightness-0 invert'
        }`}
      />
      {c.showName && <span className="whitespace-nowrap text-sm font-medium text-ink">{c.name}</span>}
    </>
  ) : (
    // No logo file yet: show the business name as a wordmark
    <span
      style={float}
      className={`logo-float whitespace-nowrap text-lg font-semibold text-ink ${c.serif ? 'font-serif tracking-tight' : 'font-display'}`}
    >
      {c.name}
    </span>
  )

  const cls = 'flex shrink-0 items-center gap-3 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300'
  return c.url ? (
    <a href={c.url} target="_blank" rel="noreferrer" data-cursor="open" aria-label={c.name} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

function Placeholder({ name, index }) {
  return (
    <span
      style={{ animationDelay: `${index * 0.7}s` }}
      className="logo-float shrink-0 whitespace-nowrap text-sm text-muted border border-line rounded-full px-4 py-1.5 opacity-70"
    >
      {name}
    </span>
  )
}

export default function TrustedBy() {
  const reduceMotion = useReducedMotion()
  const hasClients = clients.length > 0
  const list = hasClients ? clients : placeholders.map((name) => ({ name, placeholder: true }))

  const renderCopy = (prefix) =>
    list.map((c, i) =>
      c.placeholder ? (
        <Placeholder key={`${prefix}-${c.name}`} name={c.name} index={i} />
      ) : (
        <ClientLogo key={`${prefix}-${c.name}`} c={c} index={i} />
      )
    )

  const repeats = Math.max(1, Math.ceil(MIN_PER_HALF / list.length))
  const half = (id) => (
    <div key={id} aria-hidden={id === 'b'} className="flex shrink-0 items-center gap-12 pr-12">
      {Array.from({ length: repeats }).map((_, r) => renderCopy(`${id}${r}`))}
    </div>
  )

  return (
    <section className="border-y border-line bg-surface py-8">
      <div className="container-content">
        <p className="text-center text-xs uppercase tracking-wider text-muted mb-6">
          Trusted by businesses I have built for
        </p>

        {reduceMotion ? (
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">{renderCopy('s')}</div>
        ) : (
          <div
            className="overflow-hidden py-2"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <div className="marquee-track flex w-max">
              {half('a')}
              {half('b')}
            </div>
          </div>
        )}

        {!hasClients && (
          <p className="text-center text-xs text-muted mt-4">
            Add real clients in src/lib/clients.js to replace these labels.
          </p>
        )}
      </div>
    </section>
  )
}
