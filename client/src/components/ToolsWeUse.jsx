const groups = [
  {
    label: 'Frontend',
    tools: [
      { name: 'React', role: 'Interfaces' },
      { name: 'Vite', role: 'Build tooling' },
      { name: 'Tailwind CSS', role: 'Styling' },
      { name: 'Framer Motion', role: 'Animation' }
    ]
  },
  {
    label: 'Backend and data',
    tools: [
      { name: 'Node.js', role: 'Runtime' },
      { name: 'Express', role: 'APIs' },
      { name: 'MongoDB Atlas', role: 'Database' },
      { name: 'Firebase', role: 'Auth and hosting' }
    ]
  },
  {
    label: 'Launch and workflow',
    tools: [
      { name: 'GitHub', role: 'Version control' },
      { name: 'Vercel', role: 'Frontend hosting' },
      { name: 'Render', role: 'Backend hosting' },
      { name: 'Google AI Studio', role: 'AI features' }
    ]
  }
]

export default function ToolsWeUse() {
  return (
    <section className="py-28 border-t border-line">
      <div className="container-content">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-wider text-violet-soft">Better together</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Tools I build with</h2>
          <p className="mt-4 text-muted">
            A modern, proven stack, chosen so your site is fast, secure, and easy to grow.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {groups.map((g) => (
            <div key={g.label} className="rounded-2xl border border-line bg-card p-6">
              <h3 className="text-xs uppercase tracking-wider text-muted">{g.label}</h3>
              <ul className="mt-5 space-y-3">
                {g.tools.map((t) => (
                  <li
                    key={t.name}
                    className="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3"
                  >
                    <span className="text-sm font-medium">{t.name}</span>
                    <span className="text-xs text-muted">{t.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
