import { Link } from 'react-router-dom'
import { ArrowUpRight, Code2, Rocket, Sparkles } from 'lucide-react'
import HeroSlider from '../components/HeroSlider.jsx'
import TrustedBy from '../components/TrustedBy.jsx'
import FeatureRow from '../components/FeatureRow.jsx'
import PortfolioSlider from '../components/PortfolioSlider.jsx'
import Testimonial from '../components/Testimonial.jsx'
import ToolsWeUse from '../components/ToolsWeUse.jsx'
import SmartImage from '../components/SmartImage.jsx'
import MockupPreview from '../components/MockupPreview.jsx'

const solutions = [
  {
    key: 'Launch',
    title: 'Launch',
    desc: 'A new website or product, built from zero and shipped fast without cutting corners on quality.',
    icon: Rocket
  },
  {
    key: 'Grow',
    title: 'Grow',
    desc: 'Ongoing design and development support for a product that already exists and needs to move faster.',
    icon: Sparkles
  },
  {
    key: 'Transform',
    title: 'Transform',
    desc: 'A full rebuild of your brand, site, or platform when the current one no longer fits the business.',
    icon: Code2
  }
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <HeroSlider />

      {/* TRUSTED BY */}
      <TrustedBy />

      {/* EVERYTHING YOUR BUSINESS NEEDS - pill tabs */}
      <section className="py-24 border-b border-line">
        <div className="container-content">
          <h2 className="text-center text-2xl md:text-3xl font-semibold max-w-2xl mx-auto">
            Everything your business needs, in one place.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['More conversions', 'Stronger brand', 'A faster site', 'A product that works'].map((tag) => (
              <span key={tag} className="text-sm text-muted border border-line rounded-full px-4 py-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE ROWS */}
      <section className="container-content">
        <FeatureRow
          eyebrow="Web design & development"
          title="A visually stunning site that actually converts visitors into customers"
          desc="I design with both sides in mind: a site that looks like it belongs to a serious business, and one that is technically built to turn visitors into enquiries."
          linkTo="/services/web-design"
          linkLabel="More about web design"
          visual={<SmartImage src="/feature-web-design.jpg" alt="A website designed and built by Kaycodings" fallback={<MockupPreview name="Kaycodings" seed="feature-web" />} />}
        />
        <FeatureRow
          eyebrow="Brand identity"
          title="A brand system that holds up everywhere it shows up"
          desc="Logo, color, and type decisions made once, applied consistently across your site, social presence, and anything you print."
          linkTo="/services"
          linkLabel="More about brand identity"
          visual={<SmartImage src="/feature-branding.jpg" alt="Brand identity work by Kaycodings" fallback={<MockupPreview name="Kaycodings" seed="feature-brand" />} />}
          reverse
        />
        <FeatureRow
          eyebrow="AI-powered tools"
          title="A chat assistant trained on your business, built into your site"
          desc="Kay AI answers visitor questions about your services and process directly on your site, with the key kept server-side and never exposed to the browser."
          linkTo="/services"
          linkLabel="More about AI tools"
          visual={<SmartImage src="/feature-ai-tools.jpg" alt="AI chat assistant built by Kaycodings" fallback={<MockupPreview name="Kaycodings" seed="feature-ai" />} />}
        />
      </section>

      {/* PORTFOLIO */}
      <section className="py-28 border-t border-line">
        <div className="container-content">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-wider text-violet-soft">My work</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Selected projects</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <PortfolioSlider />
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-28 border-t border-line">
        <div className="container-content">
          <div className="max-w-xl mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Three ways to work with me.
            </h2>
            <p className="mt-4 text-muted">
              Depending on where your business is right now.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map(({ key, title, desc, icon: Icon }) => (
              <div
                key={key}
                className="rounded-2xl border border-line bg-card p-8 hover:border-violet-soft/60 transition-colors"
              >
                <Icon size={24} className="text-violet-soft" />
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <ToolsWeUse />

      {/* TESTIMONIAL */}
      <section className="py-28 border-t border-line">
        <div className="container-content">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-wider text-violet-soft">Testimonials</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold">What clients say</h2>
          </div>
          <Testimonial />
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 border-t border-line">
        <div className="container-content">
          <div className="rounded-3xl bg-elevated border border-line px-8 py-16 md:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold max-w-xl mx-auto">
              Ready to build something your customers remember?
            </h2>
            <p className="mt-4 text-muted max-w-md mx-auto">
              Tell me about your business and what you are trying to build. I will reply within one business day.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-warm-gradient px-6 py-3 text-sm font-medium text-white hover:brightness-110 transition-all"
            >
              Start a project
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
