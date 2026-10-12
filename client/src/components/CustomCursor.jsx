import { useState, useEffect, useRef } from 'react'

// A custom cursor that follows the pointer and expands into a label
// ("VIEW", "OPEN") when hovering an element with data-cursor="view" or
// data-cursor="open". Add that attribute to any link or card you want
// this effect on, e.g. <Link data-cursor="view" to="/work">.
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [label, setLabel] = useState(null)
  const [isTouch, setIsTouch] = useState(false)
  const raf = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const move = (e) => {
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY })
        const target = e.target.closest('[data-cursor]')
        setLabel(target ? target.getAttribute('data-cursor') : null)
      })
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  if (isTouch) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      aria-hidden="true"
    >
      <div
        className={`absolute rounded-full border border-violet-soft/70 flex items-center justify-center text-[10px] uppercase tracking-wider text-ink transition-all duration-150 ease-out ${
          label ? 'h-16 w-16 bg-base/90 backdrop-blur-sm' : 'h-3 w-3 bg-violet'
        }`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
        }}
      >
        {label}
      </div>
    </div>
  )
}
