import SmartImage from './SmartImage.jsx'
import MockupPreview from './MockupPreview.jsx'

// Shows a real project screenshot from /public/projects/<folder>/<slug>.jpg
// (or <slug>-full.jpg for the tall full page view). Falls back to an illustrated
// mockup until the file exists. Parent must be position: relative with a set size.
export default function ProjectImage({ folder, slug, name, full = false, seed }) {
  const src = `/projects/${folder}/${slug}${full ? '-full' : ''}.jpg`
  return (
    <SmartImage
      src={src}
      alt={`${name} ${full ? 'full page screenshot' : 'preview'}`}
      className="object-top"
      fallback={<MockupPreview name={name} seed={seed} tall={full} />}
    />
  )
}