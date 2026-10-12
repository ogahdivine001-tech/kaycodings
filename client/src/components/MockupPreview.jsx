// Illustrated website mockup used in place of empty image boxes.
// It is a stand-in until real screenshots are added. Parent must be position: relative with a set size.
const palettes = [
  ["#FF5A36", "#FF3D7A"],
  ["#FFA552", "#FF5A36"],
  ["#FF3D7A", "#A855F7"],
  ["#38BDF8", "#6366F1"],
  ["#34D399", "#0EA5A4"],
];

function hash(str) {
  let h = 0;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 2654435761) >>> 0;
  return h;
}

export default function MockupPreview({ name, seed, tall = false }) {
  const h = hash(seed || name);
  const [a, b] = palettes[(h >>> 9) % palettes.length];
  const layout = (h >>> 17) % 3;
  const grad = { backgroundImage: `linear-gradient(135deg, ${a}, ${b})` };
  const domain = name.toLowerCase().replace(/[^a-z0-9]+/g, "") + ".com";

  const bar = (w, extra = "") => (
    <div
      className={`h-1.5 rounded-full bg-white/20 ${extra}`}
      style={{ width: w }}
    />
  );

  const cards = (n) => (
    <div className={`grid gap-2 ${n === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="rounded-md bg-[#15151E] border border-white/5 p-2 space-y-1.5"
        >
          <div className="h-3 w-3 rounded-full" style={grad} />
          {bar("70%")}
          {bar("45%", "bg-white/10")}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="absolute inset-0 bg-[#0E0E14] flex flex-col"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#15151E] border-b border-white/5 shrink-0">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <span className="ml-3 flex-1 truncate rounded bg-[#0B0B11] px-2 py-0.5 text-[9px] text-muted">
          {domain}
        </span>
      </div>

      <div className="flex-1 overflow-hidden p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded" style={grad} />
            <span className="text-[9px] font-semibold text-white/80 truncate max-w-[90px]">
              {name}
            </span>
          </div>
          <div className="flex gap-2">
            {bar("14px")}
            {bar("14px")}
            {bar("14px")}
          </div>
        </div>

        {layout === 0 && (
          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="space-y-2">
              {bar("90%", "h-2.5 bg-white/70")}
              {bar("65%", "h-2.5 bg-white/70")}
              {bar("80%")}
              <div className="h-4 w-14 rounded-full" style={grad} />
            </div>
            <div className="aspect-[4/3] rounded-lg" style={grad} />
          </div>
        )}

        {layout === 1 && (
          <div className="space-y-2 text-center">
            <div className="mx-auto" style={{ width: "70%" }}>
              {bar("100%", "h-2.5 bg-white/70")}
            </div>
            <div className="mx-auto" style={{ width: "50%" }}>
              {bar("100%", "h-2.5 bg-white/70")}
            </div>
            <div className="mx-auto h-4 w-14 rounded-full" style={grad} />
          </div>
        )}

        {layout === 2 && (
          <div className="rounded-lg p-4 space-y-2" style={grad}>
            <div className="h-2.5 w-3/4 rounded-full bg-white/80" />
            <div className="h-2.5 w-1/2 rounded-full bg-white/80" />
            <div className="h-4 w-14 rounded-full bg-white/90" />
          </div>
        )}

        {cards(layout === 2 ? 2 : 3)}

        {tall && (
          <>
            <div className="grid grid-cols-2 gap-3 items-center pt-2">
              <div className="aspect-[4/3] rounded-lg" style={grad} />
              <div className="space-y-2">
                {bar("85%", "h-2.5 bg-white/70")}
                {bar("95%")}
                {bar("70%")}
              </div>
            </div>
            {cards(3)}
            <div className="rounded-lg bg-[#15151E] border border-white/5 p-4 space-y-2 text-center">
              <div className="mx-auto h-4 w-4 rounded-full" style={grad} />
              <div className="mx-auto" style={{ width: "80%" }}>
                {bar("100%")}
              </div>
              <div className="mx-auto" style={{ width: "55%" }}>
                {bar("100%", "bg-white/10")}
              </div>
            </div>
            <div className="rounded-lg p-4 space-y-2" style={grad}>
              <div className="h-2.5 w-2/3 rounded-full bg-white/80" />
              <div className="h-4 w-14 rounded-full bg-white/90" />
            </div>
            <div className="grid grid-cols-4 gap-2 pt-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="space-y-1.5">
                  {bar("80%")}
                  {bar("60%", "bg-white/10")}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
