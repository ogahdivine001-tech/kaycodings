import { useState } from 'react'

// Shows an image from /public if it exists, otherwise shows the fallback.
// Parent must be position: relative with a set size.
export default function SmartImage({ src, alt, fallback = null, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) return fallback
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  )
}