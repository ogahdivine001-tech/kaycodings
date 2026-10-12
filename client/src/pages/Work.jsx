import { Link } from 'react-router-dom'
import { categories } from '../lib/workData.js'
import ProjectImage from '../components/ProjectImage.jsx'

export default function Work() {
  return (
    <section className="pt-40 pb-28">
      <div className="container-content max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-semibold">My Previous Works</h1>
          <p className="mt-4 text-muted">Which of my previous works would you love to see first?</p>
        </div>

        <div className="mt-14 space-y-6">
          {categories.map((c) => (
            <div
              key={c.slug}
              className="grid md:grid-cols-5 gap-8 items-center rounded-2xl border border-line bg-card p-6 md:p-8"
            >
              <div
                data-cursor="view"
                className="relative overflow-hidden md:col-span-2 aspect-[4/3] rounded-xl bg-elevated border border-line"
              >
                <ProjectImage folder="hub" slug={c.slug} name="Kaycodings" seed={c.slug} />
              </div>
              <div className="md:col-span-3">
                <h2 className="text-xl md:text-2xl font-semibold uppercase leading-snug">{c.title}</h2>
                <p className="mt-3 text-sm text-muted leading-relaxed max-w-md">{c.blurb}</p>
                <Link
                  to={c.to}
                  className="mt-6 inline-flex items-center rounded-full bg-warm-gradient px-5 py-2.5 text-sm font-medium text-white hover:brightness-110 transition-all"
                >
                  {c.button}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted text-center">
          Sample content shown to illustrate the layout. Replace with real projects as work is completed.
        </p>
      </div>
    </section>
  )
}
