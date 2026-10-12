import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../lib/api.js";
import SocialLinks from "./SocialLinks.jsx";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "failed");
      setStatus("done");
      setEmail("");
    } catch (err) {
      setMessage(
        err.message && err.message !== "failed" && !(err instanceof TypeError)
          ? err.message
          : "Could not subscribe right now, please try again.",
      );
      setStatus("error");
    }
  };

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-content py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="font-display text-lg font-semibold">Kaycodings</span>
          <p className="mt-3 text-sm text-muted max-w-xs">
            Digital solutions for businesses ready to grow. Based in Lagos,
            working with businesses everywhere.
          </p>
          <form onSubmit={subscribe} className="mt-5 flex gap-2 max-w-xs">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 min-w-0 rounded-full bg-card border border-line px-4 py-2 text-xs focus-visible:border-violet-soft"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="shrink-0 rounded-full bg-warm-gradient px-4 py-2 text-xs font-medium text-white hover:brightness-110 transition-all disabled:opacity-60"
            >
              Subscribe
            </button>
          </form>
          {status === "done" && (
            <p className="mt-2 text-xs text-green-400">
              You are subscribed. Thank you.
            </p>
          )}
          {status === "error" && (
            <p className="mt-2 text-xs text-red-400">{message}</p>
          )}
          <SocialLinks className="mt-6" />
        </div>

        <div>
          <h4 className="text-sm text-ink mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link to="/services" className="hover:text-ink">
                Services
              </Link>
            </li>
            <li>
              <Link to="/work" className="hover:text-ink">
                Work
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-ink">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm text-ink mb-4">Address</h4>
          <p className="text-sm text-muted">Lagos, Nigeria</p>
        </div>

        <div>
          <h4 className="text-sm text-ink mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>ogahdivine001@gmail.com</li>
            <li>
              <Link to="/contact" className="hover:text-ink">
                Start a project
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-content py-6 text-xs text-muted flex flex-col md:flex-row justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Kaycodings. All rights reserved.
          </span>
          <span>Designed and built by Kaycodings.</span>
        </div>
      </div>
    </footer>
  );
}
