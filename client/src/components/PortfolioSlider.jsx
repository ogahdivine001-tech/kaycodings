import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ProjectImage from './ProjectImage.jsx'
import { projects } from '../lib/workData.js'

const placeholderProjects = projects['web-design'].items.slice(0, 3).map((p) => ({
  name: p.name,
  slug: p.slug,
  category: 'Web design and development',
  note: p.desc
}))

export default function PortfolioSlider() {
  const [index, setIndex] = useState(0)
  const project = placeholderProjects[index]

  const prev = () => setIndex((i) => (i === 0 ? placeholderProjects.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === placeholderProjects.length - 1 ? 0 : i + 1))

  return (
    <div>
      <div className="rounded-2xl border border-line bg-card overflow-hidden">
        <div
          data-cursor="view"
          className="relative overflow-hidden aspect-[16/9] bg-elevated"
        >
          <ProjectImage folder="web-design" slug={project.slug} name={project.name} />
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold">{project.name}</h4>
            <p className="text-sm text-muted">{project.category}</p>
          </div>
          <span className="text-xs text-muted hidden md:block max-w-xs text-right">{project.note}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {placeholderProjects.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-violet' : 'w-1.5 bg-line'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={prev}
            aria-label="Previous project"
            className="rounded-full border border-line p-2.5 hover:border-violet-soft transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            className="rounded-full border border-line p-2.5 hover:border-violet-soft transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}