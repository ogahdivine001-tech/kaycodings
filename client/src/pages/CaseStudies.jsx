import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import { caseStudies } from '../lib/workData.js'
import ProjectImage from '../components/ProjectImage.jsx'

export default function CaseStudies() {
  return (
    <>
      <PageBanner title="Case Studies" />

      <section className="py-16 pb-28">
        <div className="container-content max-w-4xl space-y-6">
          {caseStudies.map((c) => (
            <div
              key={c.slug}
              className="grid md:grid-cols-5 gap-8 items-center rounded-2xl border border-line bg-card p-6 md:p-8"
            >
              <div
                data-cursor="view"
                className="relative overflow-hidden md:col-span-2 aspect-[4/3] rounded-xl bg-elevated border border-line"
              >
                <ProjectImage folder="case-studies" slug={c.slug} name={c.client} />
              </div>
              <div className="md:col-span-3">
                <h2 className="text-xl font-semibold leading-snug">{c.title}</h2>
                <p className="mt-3 text-sm text-muted leading-relaxed">{c.excerpt}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{c.client}</p>
                    <p className="text-sm text-violet-soft">{c.tag}</p>
                  </div>
                  <Link
                    to="/contact"
                    className="rounded-full bg-warm-gradient px-5 py-2.5 text-sm font-medium text-white hover:brightness-110 transition-all"
                  >
                    Discuss similar goals
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <p className="pt-4 text-xs text-muted text-center">
            Sample content shown to illustrate the layout. Replace with real case studies, including real results, once projects are complete.
          </p>
        </div>
      </section>
    </>
  )
}