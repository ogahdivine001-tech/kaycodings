import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Portfolio" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`w-full max-w-content flex items-center justify-between rounded-full px-5 py-3 transition-colors duration-300 ${
          scrolled
            ? "bg-surface/80 backdrop-blur-xl border border-line"
            : "bg-transparent border border-transparent"
        }`}
      >
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Kaycodings
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? "text-ink" : "text-muted hover:text-ink"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center rounded-full bg-warm-gradient px-5 py-2 text-sm font-medium text-white hover:brightness-110 transition-all"
        >
          Start a project
        </Link>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden fixed top-20 inset-x-4 rounded-2xl bg-surface border border-line p-6 flex flex-col gap-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-base text-ink"
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-warm-gradient px-5 py-2.5 text-sm font-medium text-white"
          >
            Start a project
          </Link>
        </div>
      )}
    </header>
  );
}
