import { useState } from 'react'
import MockupPreview from './MockupPreview.jsx'

// Scrollable frame showing the full page screenshot from
// /public/projects/<folder>/<slug>-full.jpg. Falls back to an illustrated mockup.
export default function FullPageShot({ folder, slug, name }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="relative aspect-[3/4]">
        <MockupPreview name={name} tall />
      </div>
    )
  }

  return (
    <div>
      <div className="max-h-[75vh] overflow-y-auto">
        <img
          src={`/projects/${folder}/${slug}-full.jpg`}
          alt={`${name} full page screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="block h-auto w-full"
        />
      </div>
      <p className="border-t border-line px-4 py-2 text-center text-xs text-muted">
        Scroll inside the frame to see the full page
      </p>
    </div>
  )
}