import { useState } from 'react'
import { Quote } from 'lucide-react'
import { testimonials } from '../lib/testimonials.js'
import SmartImage from './SmartImage.jsx'

export default function Testimonial() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]
  if (!t) return null

  return (
    <div className="rounded-2xl border border-line bg-card p-10 max-w-xl mx-auto text-center">
      <Quote size={24} className="text-violet-soft mx-auto" />
      <p className="mt-4 text-muted leading-relaxed">"{t.quote}"</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="relative h-9 w-9 rounded-full overflow-hidden bg-warm-gradient shrink-0">
          {t.photo && <SmartImage src={t.photo} alt={t.name} fallback={null} />}
        </div>
        <div className="text-left">
          <p className="text-sm text-ink">{t.name}</p>
          <p className="text-xs text-muted">{t.business}</p>
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-violet' : 'w-1.5 bg-line'}`}
            />
          ))}
        </div>
      )}

      {t.sample && (
        <p className="mt-6 text-xs text-muted">
          Sample quote shown to illustrate the layout. Replace it in src/lib/testimonials.js.
        </p>
      )}
    </div>
  )
}