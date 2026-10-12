export default function PageBanner({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-violet-glow pt-40 pb-16 border-b border-line">
      <div className="container-content text-center">
        <h1 className="text-4xl md:text-5xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-muted max-w-xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
