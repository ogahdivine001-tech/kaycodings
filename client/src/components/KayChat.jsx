import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { API_BASE } from '../lib/api.js'

export default function KayChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi, I am Kay. Ask me about Kaycodings services, process, or pricing.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      const data = await res.json()
      const reply = res.ok ? data.reply : (data.error || 'Something went wrong.')
      setMessages((m) => [...m, { role: 'assistant', text: reply }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: 'Could not reach the server. Try again shortly.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-80 max-w-[90vw] h-96 rounded-2xl border border-line bg-surface flex flex-col overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-elevated">
            <span className="text-sm font-medium">Kay AI</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} className="text-muted" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] text-sm px-3 py-2 rounded-xl ${
                  m.role === 'user'
                    ? 'ml-auto bg-violet text-white'
                    : 'bg-card text-ink'
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] text-sm px-3 py-2 rounded-xl bg-card text-muted">
                Typing...
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-line p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my services..."
              className="flex-1 min-w-0 rounded-full bg-card border border-line px-4 py-2 text-sm focus-visible:border-violet-soft"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Send message"
              className="shrink-0 rounded-full bg-warm-gradient p-2.5 text-white hover:brightness-110 transition-all disabled:opacity-60"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close Kay AI chat' : 'Open Kay AI chat'}
        className="relative h-14 w-14 rounded-full bg-warm-gradient text-white flex items-center justify-center shadow-lg hover:brightness-110 transition-all"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-violet/40 animate-ping" aria-hidden="true" />}
        <span className="relative">{open ? <X size={22} /> : <MessageCircle size={22} />}</span>
      </button>
    </div>
  )
}
