import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-violet-glow pt-48 pb-32">
      <div className="container-content text-center">
        <p className="font-display text-8xl md:text-9xl font-semibold text-transparent bg-clip-text bg-warm-gradient">404</p>
        <h1 className="mt-6 text-3xl md:text-4xl font-semibold">This page does not exist.</h1>
        <p className="mt-4 text-muted max-w-md mx-auto">
          The link may be broken or the page may have moved. Head back home or see what I have built.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-warm-gradient px-6 py-3 text-sm font-medium text-white"
          >
            Back to home <ArrowUpRight size={16} />
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm hover:border-violet-soft transition-colors"
          >
            See my work
          </Link>
        </div>
      </div>
    </section>
  )
}
