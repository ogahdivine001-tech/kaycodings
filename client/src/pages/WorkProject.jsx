import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowUpRight, ExternalLink, Tag } from 'lucide-react'
import { projects } from '../lib/workData.js'
import ProjectImage from '../components/ProjectImage.jsx'
import FullPageShot from '../components/FullPageShot.jsx'

export default function WorkProject() {
  const { category, slug } = useParams()
  const group = projects[category]
  const project = group?.items.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/work" replace />

  const others = group.items.filter((p) => p.slug !== slug).slice(0, 6)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-violet-glow pt-40 pb-20 border-b border-line">
        <div className="container-content grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold uppercase leading-tight">{project.name}</h1>
            <p className="mt-5 text-muted">Kaycodings {group.label} project.</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
              <Tag size={14} className="text-violet-soft" /> {project.industry}
            </p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-warm-gradient px-6 py-3 text-sm font-medium text-white hover:brightness-110 transition-all"
              >
                View live site <ExternalLink size={16} />
              </a>
            )}
          </div>
          <div
            data-cursor="view"
            className="relative overflow-hidden aspect-[16/9] rounded-xl border border-line bg-card"
          >
            <ProjectImage folder={category} slug={project.slug} name={project.name} />
          </div>
        </div>
      </section>

      {/* INFORMATION */}
      <section className="py-20">
        <div className="container-content grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted">Project</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold uppercase">Information</h2>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-violet-soft">Project objective</span>
            <p className="mt-3 text-muted leading-relaxed">{project.objective}</p>
          </div>
        </div>
      </section>

      {/* FULL SCREENSHOT */}
      <section className="pb-20">
        <div className="container-content max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-line bg-card">
            <FullPageShot folder={category} slug={project.slug} name={project.name} />
          </div>
        </div>
      </section>

      {/* RESULT */}
      <section className="py-20 border-t border-line">
        <div className="container-content grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted">Elegantly designed</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold uppercase">The result</h2>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-violet-soft">Project outcome</span>
            <p className="mt-3 text-muted leading-relaxed">{project.outcome}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm hover:border-violet-soft transition-colors"
                >
                  View live site <ExternalLink size={16} />
                </a>
              )}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-warm-gradient px-6 py-3 text-sm font-medium text-white hover:brightness-110 transition-all"
              >
                Start a similar project <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PROJECTS */}
      {others.length > 0 && (
        <section className="py-20 border-t border-line">
          <div className="container-content">
            <h2 className="text-center text-2xl md:text-3xl font-semibold uppercase">Explore other projects</h2>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((p) => (
                <div key={p.slug} className="rounded-2xl border border-line bg-card overflow-hidden flex flex-col">
                  <div data-cursor="view" className="relative overflow-hidden aspect-[16/9] bg-elevated">
                    <ProjectImage folder={category} slug={p.slug} name={p.name} />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{p.desc}</p>
                    <div className="mt-5 pt-4 border-t border-line flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                        <Tag size={14} className="text-violet-soft" /> {p.industry}
                      </span>
                      <Link
                        to={`/work/${category}/${p.slug}`}
                        className="rounded-full border border-line px-4 py-1.5 text-sm hover:border-violet-soft transition-colors"
                      >
                        See Project
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {group.sample && (
              <p className="mt-10 text-xs text-muted text-center">
                Sample content shown to illustrate the layout. Replace with real projects as work is completed.
              </p>
            )}
          </div>
        </section>
      )}
    </>
  )
}