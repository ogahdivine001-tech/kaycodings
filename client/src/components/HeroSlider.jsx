import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

// Each slide controls its own background: 'text' is plain, 'image' needs a
// file in client/public/, 'video' needs a muted looping file in client/public/.
// Replace the placeholder paths below once you have real assets.
const slides = [
  {
    type: 'text',
    eyebrow: 'Welcome to Kaycodings',
    heading: 'Digital solutions for businesses ready to grow.',
    sub: 'I design and build websites, products, and brand systems for companies who are past the idea stage.'
  },
  {
    type: 'image',
    image: '/hero-slide-2.jpg',
    eyebrow: 'Web design & development',
    heading: 'Sites built to convert, not just look good.',
    sub: 'Every project is designed with the business outcome in mind, not just the visuals.'
  },
  {
    type: 'video',
    video: '/hero-slide-3.mp4',
    eyebrow: 'See it in motion',
    heading: 'Digital experiences that move with your brand.',
    sub: 'From first sketch to shipped product, built end to end by one dedicated developer and designer.'
  }
]

const SLIDE_DURATION = 6000

export default function HeroSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[index]

  return (
    <section data-no-rv className="relative overflow-hidden pt-40 pb-20 min-h-[600px] flex items-center">
      {/* Background layer, swaps per slide type */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          {slide.type === 'text' && (
            <motion.div
              key="bg-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-violet-glow"
            />
          )}

          {slide.type === 'image' && (
            <motion.div
              key="bg-image"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-base/80" />
            </motion.div>
          )}

          {slide.type === 'video' && (
            <motion.div
              key="bg-video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0"
            >
              <video
                className="h-full w-full object-cover"
                src={slide.video}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-base/75" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text content, swaps per slide */}
      <div className="container-content relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs uppercase tracking-wider text-violet-soft border border-line rounded-full px-4 py-1.5 mb-6">
              {slide.eyebrow}
            </span>

            <h1 className="text-4xl md:text-6xl font-semibold leading-[1.08] max-w-3xl">
              {slide.heading}
            </h1>

            <p className="mt-6 text-lg text-muted max-w-xl">{slide.sub}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-warm-gradient px-6 py-3 text-sm font-medium text-white hover:brightness-110 transition-all"
              >
                Start a project
                <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-ink hover:border-violet-soft transition-colors"
              >
                See my work
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="mt-14 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-violet' : 'w-1.5 bg-line'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
