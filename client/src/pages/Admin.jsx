import { useState, useEffect, useCallback } from "react";
import {
  RefreshCw,
  Mail,
  MessageCircle,
  Copy,
  Check,
  LogOut,
} from "lucide-react";
import { API_BASE } from "../lib/api.js";

const STORAGE_KEY = "kc_admin_key";

// Turns 0801... into 234801... so the WhatsApp link opens correctly
const waNumber = (raw = "") => {
  const d = raw.replace(/\D/g, "");
  return d.startsWith("0") && d.length === 11 ? "234" + d.slice(1) : d;
};

const fmt = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function Admin() {
  const [key, setKey] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) || "",
  );
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("enquiries");
  const [data, setData] = useState({ enquiries: [], subscribers: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [testMsg, setTestMsg] = useState(null);

  const load = useCallback(async (k) => {
    setLoading(true);
    setError("");
    try {
      const get = (path) =>
        fetch(`${API_BASE}/api/admin/${path}`, {
          headers: { "x-admin-key": k },
        });
      const [a, b] = await Promise.all([get("enquiries"), get("subscribers")]);
      if (a.status === 401 || b.status === 401) {
        sessionStorage.removeItem(STORAGE_KEY);
        setKey("");
        setError("Wrong key. Try again.");
        return;
      }
      const [ja, jb] = await Promise.all([
        a.json().catch(() => ({})),
        b.json().catch(() => ({})),
      ]);
      if (!a.ok) throw new Error(ja.error || "Could not load enquiries.");
      if (!b.ok) throw new Error(jb.error || "Could not load subscribers.");
      setData({ enquiries: ja.items || [], subscribers: jb.items || [] });
    } catch (e) {
      setError(
        e instanceof TypeError
          ? "Could not reach the server. Make sure it is running (npm run dev in the server folder)."
          : e.message,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (key) load(key);
  }, [key, load]);

  const login = (e) => {
    e.preventDefault();
    const k = input.trim();
    if (!k) return;
    sessionStorage.setItem(STORAGE_KEY, k);
    setKey(k);
    setInput("");
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setKey("");
    setData({ enquiries: [], subscribers: [] });
  };

  const copyEmails = async () => {
    await navigator.clipboard.writeText(
      data.subscribers.map((s) => s.email).join(", "),
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const sendTest = async () => {
    setTestMsg({ ok: null, text: "Sending test email..." });
    try {
      const res = await fetch(`${API_BASE}/api/admin/test-email`, {
        method: "POST",
        headers: { "x-admin-key": key },
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.sent) {
        setTestMsg({
          ok: true,
          text: `Test email sent to ${body.to}. Check the inbox, then Spam and Promotions.`,
        });
      } else {
        setTestMsg({
          ok: false,
          text: body.reason || body.error || "Could not send the test email.",
        });
      }
    } catch {
      setTestMsg({
        ok: false,
        text: "Could not reach the server. Make sure it is running.",
      });
    }
  };

  if (!key) {
    return (
      <section className="pt-40 pb-28">
        <div className="container-content max-w-md">
          <h1 className="text-3xl font-semibold">Admin</h1>
          <p className="mt-3 text-sm text-muted">
            Enter your admin key to see enquiries and subscribers.
          </p>
          <form onSubmit={login} className="mt-8 space-y-4">
            <input
              type="password"
              autoComplete="current-password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Admin key"
              className="w-full rounded-lg bg-card border border-line px-4 py-3 text-sm focus-visible:border-violet-soft"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-warm-gradient px-6 py-3 text-sm font-medium text-white"
            >
              Open dashboard
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </form>
        </div>
      </section>
    );
  }

  const tabClass = (name) =>
    `rounded-full px-5 py-2 text-sm transition-colors ${
      tab === name
        ? "bg-warm-gradient text-white"
        : "border border-line text-muted hover:border-violet-soft"
    }`;

  return (
    <section className="pt-40 pb-28">
      <div className="container-content max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold">Admin</h1>
          <div className="flex gap-3">
            <button
              onClick={sendTest}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-violet-soft transition-colors"
            >
              <Mail size={14} /> Send test email
            </button>
            <button
              onClick={() => load(key)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-violet-soft transition-colors disabled:opacity-60"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />{" "}
              Refresh
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-violet-soft transition-colors"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        </div>

        {testMsg && (
          <p
            className={`mt-6 rounded-lg border p-4 text-sm ${
              testMsg.ok === true
                ? "border-green-500/40 text-green-400"
                : testMsg.ok === false
                  ? "border-red-500/40 text-red-400"
                  : "border-line text-muted"
            }`}
          >
            {testMsg.text}
          </p>
        )}

        <div className="mt-8 flex gap-3">
          <button
            className={tabClass("enquiries")}
            onClick={() => setTab("enquiries")}
          >
            Enquiries ({data.enquiries.length})
          </button>
          <button
            className={tabClass("subscribers")}
            onClick={() => setTab("subscribers")}
          >
            Subscribers ({data.subscribers.length})
          </button>
        </div>

        {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

        {tab === "enquiries" && (
          <div className="mt-8 space-y-5">
            {!loading && !error && data.enquiries.length === 0 && (
              <p className="rounded-2xl border border-dashed border-line bg-card p-10 text-center text-sm text-muted">
                No enquiries yet. They will appear here as soon as someone uses
                the contact form.
              </p>
            )}
            {data.enquiries.map((e) => (
              <article
                key={e._id}
                className="rounded-2xl border border-line bg-card p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {e.firstName} {e.lastName}
                    </h2>
                    <p className="text-sm text-muted">
                      {e.business} | {e.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <time className="text-xs text-muted">
                      {fmt(e.createdAt)}
                    </time>
                    {e.emailStatus === "sent" && (
                      <p className="mt-1 text-xs text-green-400">
                        Email sent to you
                      </p>
                    )}
                    {e.emailStatus && e.emailStatus !== "sent" && (
                      <p className="mt-1 max-w-xs text-xs text-amber-400">
                        Email not sent: {e.emailStatus.replace(/^failed: /, "")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(e.services || []).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-xs text-violet-soft"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <dl className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div>
                    <dt className="inline text-muted">Budget: </dt>
                    <dd className="inline">{e.budget}</dd>
                  </div>
                  {e.timeline && (
                    <div>
                      <dt className="inline text-muted">Start: </dt>
                      <dd className="inline">{e.timeline}</dd>
                    </div>
                  )}
                  {e.hearAbout && (
                    <div>
                      <dt className="inline text-muted">Heard via: </dt>
                      <dd className="inline">{e.hearAbout}</dd>
                    </div>
                  )}
                  {e.currentWebsite && (
                    <div>
                      <dt className="inline text-muted">Website: </dt>
                      <dd className="inline">{e.currentWebsite}</dd>
                    </div>
                  )}
                </dl>

                {e.message && (
                  <p className="mt-5 rounded-lg bg-surface border border-line p-4 text-sm text-muted whitespace-pre-wrap">
                    {e.message}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${e.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-violet-soft transition-colors"
                  >
                    <Mail size={14} /> {e.email}
                  </a>
                  <a
                    href={`https://wa.me/${waNumber(e.whatsapp)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-warm-gradient px-4 py-2 text-sm font-medium text-white"
                  >
                    <MessageCircle size={14} /> {e.whatsapp}
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === "subscribers" && (
          <div className="mt-8">
            {data.subscribers.length > 0 && (
              <button
                onClick={copyEmails}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-violet-soft transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
                {copied ? "Copied" : "Copy all emails"}
              </button>
            )}
            {!loading && !error && data.subscribers.length === 0 && (
              <p className="rounded-2xl border border-dashed border-line bg-card p-10 text-center text-sm text-muted">
                No subscribers yet. Emails from the footer sign-up box will
                appear here.
              </p>
            )}
            <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
              {data.subscribers.map((s) => (
                <li
                  key={s._id}
                  className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 text-sm"
                >
                  <span>{s.email}</span>
                  <time className="text-xs text-muted">{fmt(s.createdAt)}</time>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
