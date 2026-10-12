import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import MockupPreview from './MockupPreview.jsx'

// `visual` is the image side. Pass a <SmartImage /> to show a photo from /public,
// or leave it out to show an illustrated mockup.
export default function FeatureRow({ eyebrow, title, desc, linkTo, linkLabel, reverse, visual }) {
  return (
    <div
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 border-b border-line ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div className="relative aspect-[4/3] rounded-2xl border border-line bg-card overflow-hidden">
        {visual || <MockupPreview name="Kaycodings" seed={eyebrow} />}
      </div>

      <div>
        <span className="text-xs uppercase tracking-wider text-violet-soft">{eyebrow}</span>
        <h3 className="mt-4 text-2xl md:text-3xl font-semibold leading-snug">{title}</h3>
        <p className="mt-4 text-muted leading-relaxed max-w-md">{desc}</p>
        {linkTo && (
          <Link
            to={linkTo}
            className="mt-6 inline-flex items-center gap-1 text-sm text-violet-soft hover:text-violet"
          >
            {linkLabel}
            <ArrowUpRight size={14} />
          </Link>
        )}
      </div>
    </div>
  )
}