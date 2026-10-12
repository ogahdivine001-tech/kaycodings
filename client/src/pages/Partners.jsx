const samplePartners = [
  { name: "MongoDB Atlas", role: "Database" },
  { name: "Vercel", role: "Frontend hosting" },
  { name: "Render", role: "Backend hosting" },
  { name: "Google AI Studio", role: "AI tools" },
  { name: "GitHub", role: "Version control" },
];

export default function Partners() {
  return (
    <section className="pt-40 pb-28">
      <div className="container-content">
        <h1 className="text-4xl md:text-5xl font-semibold max-w-2xl">
          Better together.
        </h1>
        <p className="mt-4 text-muted max-w-xl">
          Tools and platforms we build with.
        </p>

        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {samplePartners.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-line bg-card p-6"
            >
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.role}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted">
          These are the tools used to build this site. Add real client or agency
          partnerships here once confirmed.
        </p>
      </div>
    </section>
  );
}
