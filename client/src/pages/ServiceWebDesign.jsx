import { Link } from 'react-router-dom'
import { ArrowUpRight, TrendingUp, Target, Rocket, Building2, AppWindow, Wrench, Smartphone, Tag } from 'lucide-react'
import { projects } from '../lib/workData.js'
import ProjectImage from '../components/ProjectImage.jsx'
import SmartImage from '../components/SmartImage.jsx'

const reasons = [
  {
    icon: Target,
    title: 'Built around your goals',
    desc: 'I start with what the site needs to achieve for your business, then design and build backwards from that.'
  },
  {
    icon: TrendingUp,
    title: 'Found and fast',
    desc: 'Clean structure, fast loading, and search friendly pages so the right people can find you and stay.'
  },
  {
    icon: Rocket,
    title: 'Ready to grow',
    desc: 'A solid foundation you can extend later with new pages, products, or features without a rebuild.'
  }
]

const solutions = [
  { icon: Building2, title: 'Company profile website', desc: 'Professional, well designed sites that present your business clearly and build trust with visitors.' },
  { icon: AppWindow, title: 'Custom web applications', desc: 'Tailored web apps that solve a specific problem for your team or your customers.' },
  { icon: Wrench, title: 'Software tools for businesses', desc: 'Internal dashboards and tools that streamline operations and save your team time.' },
  { icon: Smartphone, title: 'Mobile friendly experiences', desc: 'Every build works smoothly on phones first, since that is where most visitors arrive.' }
]

const process = [
  'Discovery meeting',
  'Research',
  'Wireframing',
  'Website content',
  'UI/UX design',
  'Front-end development',
  'Backend development',
  'Testing and QA',
  'Documentation',
  'Continuous support'
]

export default function ServiceWebDesign() {
  const sample = projects['web-design'].items.slice(0, 6)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-violet-glow pt-40 pb-24 text-center">
        <div className="container-content">
          <span className="inline-block text-xs uppercase tracking-wider text-violet-soft border border-line rounded-full px-4 py-1.5 mb-6">
            Web design and development
          </span>
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.08] max-w-3xl mx-auto">
            Websites designed to look sharp and work hard.
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl mx-auto">
            I design and build websites and web products that help businesses present themselves well, run smoother, and win more customers.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-warm-gradient px-6 py-3 text-sm font-medium text-white hover:brightness-110 transition-all"
            >
              Get started <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/work/web-design"
              className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm hover:border-violet-soft transition-colors"
            >
              See my work
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO SPLIT */}
      <section className="py-24 border-y border-line bg-surface">
        <div className="container-content grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs uppercase tracking-wider text-violet-soft">Enhance your digital presence</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-snug">
              Let me design a website that is both beautiful and effective.
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              Your website is often the first thing a customer sees. If it is slow, confusing, or out of date, they leave. I combine clear design with solid engineering so visitors understand what you offer and know exactly what to do next.
            </p>
          </div>
          <div
            data-cursor="view"
            className="relative overflow-hidden aspect-[4/3] rounded-2xl border border-line bg-card flex items-center justify-center text-sm text-muted"
          >
            <SmartImage
              src="/web-design-intro.jpg"
              alt="Kaycodings workspace"
              fallback={<span>Workspace photo</span>}
            />
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24">
        <div className="container-content">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
              Stand out from your competitors and turn visitors into customers.
            </h2>
            <p className="mt-4 text-muted">What you get when the site is built with intent.</p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-line bg-card p-8 hover:border-violet-soft/60 transition-colors">
                <Icon size={24} className="text-violet-soft" />
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="py-24 border-t border-line">
        <div className="container-content">
          <div className="text-center">
            <span className="text-xs uppercase tracking-wider text-violet-soft">My previous works</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold">See my work in action</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sample.map((p) => (
              <div key={p.name + p.desc} className="rounded-2xl border border-line bg-card overflow-hidden">
                <div data-cursor="view" className="relative overflow-hidden aspect-[16/9] bg-elevated">
                  <ProjectImage folder="web-design" slug={p.slug} name={p.name} />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{p.desc}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
                    <Tag size={14} className="text-violet-soft" /> {p.industry}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/work/web-design"
              className="inline-flex items-center gap-2 rounded-full bg-warm-gradient px-6 py-3 text-sm font-medium text-white hover:brightness-110 transition-all"
            >
              View more works <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-24 border-t border-line bg-surface">
        <div className="container-content grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-4xl font-semibold leading-snug">What web solution fits your needs?</h2>
            <p className="mt-5 text-muted leading-relaxed">
              My web development services cover a wide range of needs. Whatever the size of the project, I shape the approach around your business and the people using the product.
            </p>
          </div>
          <div className="md:col-span-3 grid sm:grid-cols-2 gap-5">
            {solutions.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-line bg-card p-6">
                <Icon size={20} className="text-violet-soft" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 border-t border-line">
        <div className="container-content text-center max-w-3xl">
          <span className="text-xs uppercase tracking-wider text-violet-soft">Why work with me</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold leading-snug">
            How I deliver quality and functional websites
          </h2>
          <p className="mt-4 text-muted">Every project follows the same clear process, from first call to ongoing support.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {process.map((step) => (
              <span key={step} className="text-sm border border-line rounded-lg bg-card px-4 py-2">
                {step}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-line">
        <div className="container-content grid md:grid-cols-2 gap-12 items-center">
          <div className="relative overflow-hidden aspect-[4/3] rounded-2xl border border-line bg-card flex items-center justify-center text-sm text-muted">
            <SmartImage
              src="/web-design-cta.jpg"
              alt="A finished website on a laptop"
              fallback={<span>Photo placeholder</span>}
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-snug">Ready to launch your website and get more leads?</h2>
            <p className="mt-5 text-muted leading-relaxed">
              Tell me about your business and what you want the site to do. I will reply within one business day with next steps.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-warm-gradient px-6 py-3 text-sm font-medium text-white hover:brightness-110 transition-all"
            >
              Work with me <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
