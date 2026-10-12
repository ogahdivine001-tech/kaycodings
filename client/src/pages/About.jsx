export default function About() {
  return (
    <section className="pt-40 pb-28">
      <div className="container-content grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-xs uppercase tracking-wider text-violet-soft">
            About Kaycodings
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
            One developer and designer, fully on your project.
          </h1>
          <p className="mt-6 text-muted leading-relaxed">
            I am Ogah Divine, a full stack web developer and graphic designer
            based in Lagos, building websites since 2023. Kaycodings is my
            studio, and right now it is just me, which means you work directly
            with the person designing and building your project.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            I handle everything from the first conversation to the version that
            goes live, across design, front end, back end, and launch.
          </p>

          <div className="mt-8 rounded-2xl border border-line bg-card p-8">
            <h2 className="text-lg font-semibold">How I work</h2>
            <ul className="mt-5 space-y-3 text-muted text-sm">
              <li>Direct communication with me, with no middlemen.</li>
              <li>Fixed scope and timeline agreed before work starts.</li>
              <li>
                You own the code and the design files when the project ends.
              </li>
            </ul>
          </div>
        </div>

        <div className="relative max-w-md mx-auto md:ml-auto w-full">
          <div
            className="absolute -inset-3 rounded-3xl bg-warm-gradient opacity-30 blur-2xl"
            aria-hidden="true"
          />
          <img
            src="/about-photo.jpg"
            alt="Ogah Divine, founder of Kaycodings"
            className="relative w-full aspect-[4/5] object-cover object-top rounded-2xl border border-line"
          />
        </div>
      </div>
    </section>
  );
}
