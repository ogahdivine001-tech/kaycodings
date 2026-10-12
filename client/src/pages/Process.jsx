const steps = [
  {
    n: '1',
    title: 'Discovery',
    desc: 'We talk through your business, your users, and what the project needs to achieve.'
  },
  {
    n: '2',
    title: 'Design',
    desc: 'Wireframes and visual design, reviewed with you before any code is written.'
  },
  {
    n: '3',
    title: 'Build',
    desc: 'Development in short cycles, with working versions shared as the project moves.'
  },
  {
    n: '4',
    title: 'Launch',
    desc: 'Testing, handover, and a live site or product with documentation you can use.'
  }
]

export default function Process() {
  return (
    <section className="pt-40 pb-28">
      <div className="container-content">
        <h1 className="text-4xl md:text-5xl font-semibold max-w-2xl">
          How a project runs.
        </h1>
        <p className="mt-4 text-muted max-w-xl">
          Four stages, used for every project regardless of size.
        </p>

        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.n}>
              <span className="text-sm text-violet-soft">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
