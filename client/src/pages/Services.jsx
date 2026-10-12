import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Code2, Palette, PenTool, ShoppingCart, Layers, Sparkles } from 'lucide-react'

const serviceList = [
  {
    title: 'Web development',
    to: '/services/web-design',
    icon: Code2,
    detail:
      'Custom websites and web apps built with React and Node, from marketing sites to full product platforms.',
    includes: ['React & Node builds', 'Fast, responsive by default', 'CMS or custom backend']
  },
  {
    title: 'UI/UX design',
    icon: Palette,
    detail:
      'Interface design grounded in how real users will move through the product, not just how it looks in a mockup.',
    includes: ['Wireframes & prototypes', 'User flow mapping', 'Design systems']
  },
  {
    title: 'Brand identity',
    icon: PenTool,
    detail:
      'Logos, color systems, and visual language that hold up across a website, social media, and print.',
    includes: ['Logo & mark design', 'Color & type system', 'Brand guidelines']
  },
  {
    title: 'E-commerce',
    icon: ShoppingCart,
    detail:
      'Storefronts built to actually convert, with payments, inventory, and checkout handled properly.',
    includes: ['Payment integration', 'Inventory management', 'Conversion-focused checkout']
  },
  {
    title: 'Digital products',
    icon: Layers,
    detail:
      'SaaS tools and internal platforms, designed and built end to end for a specific business problem.',
    includes: ['Product strategy', 'Full-stack build', 'Ongoing iteration']
  },
  {
    title: 'AI-powered tools',
    icon: Sparkles,
    detail:
      'Chat assistants and automation built into your product or site, using your own data and workflows.',
    includes: ['Custom chat assistants', 'Workflow automation', 'Secure, server-side keys']
  }
]

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0)
  const active = serviceList[openIndex] ?? serviceList[0]
  const ActiveIcon = active.icon

  return (
    <section className="pt-40 pb-28">
      <div className="container-content">
        <h1 className="text-4xl md:text-5xl font-semibold max-w-2xl">
          What I do.
        </h1>
        <p className="mt-4 text-muted max-w-xl">
          Six core services, applied in whatever combination your business actually needs.
        </p>

        <div className="mt-16 grid md:grid-cols-5 gap-10">
          {/* Accordion list */}
          <div className="md:col-span-3 border-t border-line">
            {serviceList.map((s, i) => {
              const isOpen = openIndex === i
              const Icon = s.icon
              return (
                <div key={s.title} className="border-b border-line">
                  <button
                    className="w-full flex items-center gap-4 py-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <span
                      className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center border transition-colors ${
                        isOpen ? 'bg-warm-gradient border-transparent text-white' : 'border-line text-violet-soft'
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="text-xl font-medium flex-1">{s.title}</span>
                    <ChevronDown
                      size={20}
                      className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-6 pl-14 fade-in-down">
                      <p className="text-muted max-w-xl leading-relaxed">{s.detail}</p>
                      <ul className="mt-4 space-y-2 md:hidden">
                        {s.includes.map((item) => (
                          <li key={item} className="text-sm text-muted flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-violet-soft" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Sticky visual panel, desktop only */}
          <div className="hidden md:block md:col-span-2">
            <div key={active.title} className="sticky top-32 rounded-2xl border border-line bg-card p-8 fade-in-down">
              <span className="h-14 w-14 rounded-full bg-warm-gradient flex items-center justify-center text-white">
                <ActiveIcon size={24} />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{active.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{active.detail}</p>
              <ul className="mt-6 space-y-3">
                {active.includes.map((item) => (
                  <li key={item} className="text-sm text-muted flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-soft" />
                    {item}
                  </li>
                ))}
              </ul>
              {active.to && (
                <Link to={active.to} className="mt-6 inline-block text-sm text-violet-soft hover:text-violet">
                  Learn more
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
