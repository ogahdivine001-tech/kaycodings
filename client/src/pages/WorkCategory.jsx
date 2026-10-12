import { Link, useParams, Navigate } from 'react-router-dom'
import { Tag, MessageCircle, Mail } from 'lucide-react'
import PageBanner from '../components/PageBanner.jsx'
import { projects } from '../lib/workData.js'
import { whatsappLink, emailLink } from '../lib/contact.js'
import ProjectImage from '../components/ProjectImage.jsx'

export default function WorkCategory() {
  const { category } = useParams()
  const data = projects[category]

  if (!data) return <Navigate to="/work" replace />

  return (
    <>
      <PageBanner title={data.heading} />

      <section className="py-16">
        <div className="container-content text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Ready to get started? Contact me now</h2>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-6 py-3 text-sm hover:border-violet-soft transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href={emailLink}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-6 py-3 text-sm hover:border-violet-soft transition-colors"
            >
              <Mail size={16} /> Email
            </a>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-content">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.map((p) => (
              <div key={p.slug} className="rounded-2xl border border-line bg-card overflow-hidden flex flex-col">
                <div
                  data-cursor="view"
                  className="relative overflow-hidden aspect-[16/9] bg-elevated"
                >
                  <ProjectImage folder={category} slug={p.slug} name={p.name} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{p.desc}</p>
                  <div className="mt-5 pt-5 border-t border-line flex items-center justify-between">
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
          {data.sample && (
            <p className="mt-10 text-xs text-muted text-center">
              Sample content shown to illustrate the layout. Replace with real projects as work is completed.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
