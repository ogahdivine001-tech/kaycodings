import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MessageCircle, Check } from 'lucide-react'
import { API_BASE } from '../lib/api.js'
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from '../lib/contact.js'
import SocialLinks from '../components/SocialLinks.jsx'

const categories = [
  'Restaurant or food',
  'Real estate',
  'Education',
  'E-commerce or retail',
  'Health and wellness',
  'Fashion and beauty',
  'Professional services',
  'Technology',
  'Non-profit',
  'Other'
]

const serviceOptions = [
  'Website design and development',
  'E-commerce store',
  'Branding and logo design',
  'UI/UX design',
  'Web app or digital product',
  'AI chat assistant',
  'Not sure yet'
]

const budgets = [
  'Under ₦150,000',
  '₦150,000 to ₦500,000',
  '₦500,000 to ₦1,500,000',
  '₦1,500,000 to ₦5,000,000',
  'Above ₦5,000,000',
  'Not sure yet'
]

const timelines = ['Within a month', '1 to 3 months', 'Flexible']

const sources = ['Instagram', 'X (Twitter)', 'WhatsApp', 'Referral', 'Google search', 'GitHub', 'Other']

const whatsappReady = /^\d+$/.test(WHATSAPP_NUMBER)

const inputClass =
  'mt-1.5 w-full rounded-lg bg-card border border-line px-4 py-3 text-sm placeholder:text-muted/60 focus-visible:border-violet-soft [color-scheme:dark]'

function Field({ label, required, error, children, className = '' }) {
  return (
    <div className={className}>
      <label className="text-sm text-muted">
        {label}
        {required && <span className="text-violet-soft"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: { services: [] } })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [sent, setSent] = useState(null)

  const onSubmit = async (data) => {
    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, services: data.services || [] })
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || 'Request failed')
      setSent(data)
      setStatus('sent')
      reset()
    } catch (err) {
      setErrorMessage(err.message && err.message !== 'Request failed' ? err.message : 'Something went wrong. Please email or WhatsApp instead.')
      setStatus('error')
    }
  }

  const whatsappHref = () => {
    if (!sent) return '#'
    const msg =
      `Hi, I am ${sent.firstName} ${sent.lastName || ''} from ${sent.business}. ` +
      `I just sent an enquiry on your website about: ${(sent.services || []).join(', ')}. ` +
      `Budget: ${sent.budget}.`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg.replace(/\s+/g, ' ').trim())}`
  }

  return (
    <section className="pt-40 pb-28">
      <div className="container-content grid md:grid-cols-5 gap-14">
        <div className="md:col-span-2">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Start a project.</h1>
          <p className="mt-6 text-muted leading-relaxed max-w-md">
            Tell me about your business and what you need. Your details are only used to understand your project and reply to you.
          </p>

          <ol className="mt-10 space-y-5">
            {[
              ['Send your details', 'The form takes about two minutes.'],
              ['Get a reply', 'You will hear back within one business day.'],
              ['Agree the plan', 'Scope and timeline are agreed before any work starts.']
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span className="shrink-0 h-8 w-8 rounded-full bg-warm-gradient text-white text-sm font-medium flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-sm text-muted">
            Prefer email? Write to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-soft">
              {CONTACT_EMAIL}
            </a>
          </p>
          <div className="mt-8">
            <p className="text-sm text-muted mb-4">Find me online</p>
            <SocialLinks />
          </div>
        </div>

        <div className="md:col-span-3">
          {status === 'sent' ? (
            <div className="rounded-2xl border border-line bg-card p-10 text-center fade-in-down">
              <span className="mx-auto h-12 w-12 rounded-full bg-warm-gradient text-white flex items-center justify-center">
                <Check size={22} />
              </span>
              <h2 className="mt-6 text-2xl font-semibold">Thanks, {sent?.firstName}. Your enquiry is in.</h2>
              <p className="mt-3 text-muted max-w-sm mx-auto">
                You will get a reply within one business day. For a faster response, message on WhatsApp too.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {whatsappReady && (
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="open"
                    className="inline-flex items-center gap-2 rounded-full bg-warm-gradient px-6 py-3 text-sm font-medium text-white"
                  >
                    <MessageCircle size={16} /> Continue on WhatsApp
                  </a>
                )}
                <button
                  onClick={() => setStatus('idle')}
                  className="rounded-full border border-line px-6 py-3 text-sm hover:border-violet-soft transition-colors"
                >
                  Send another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-2xl border border-line bg-surface p-6 md:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="First name" required error={errors.firstName && 'Required'}>
                  <input {...register('firstName', { required: true })} placeholder="First name" className={inputClass} />
                </Field>
                <Field label="Last name">
                  <input {...register('lastName')} placeholder="Last name" className={inputClass} />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Business email" required error={errors.email && 'Enter a valid email'}>
                  <input
                    type="email"
                    {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ })}
                    placeholder="you@business.com"
                    className={inputClass}
                  />
                </Field>
                <Field label="WhatsApp number" required error={errors.whatsapp && 'Enter a valid number'}>
                  <input
                    type="tel"
                    {...register('whatsapp', {
                      required: true,
                      validate: (v) => {
                        const n = v.replace(/\D/g, '').length
                        return n >= 7 && n <= 15
                      }
                    })}
                    placeholder="+234 801 234 5678"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Business name" required error={errors.business && 'Required'}>
                  <input {...register('business', { required: true })} placeholder="Your business name" className={inputClass} />
                </Field>
                <Field label="Current website, if any">
                  <input {...register('currentWebsite')} placeholder="https://" className={inputClass} />
                </Field>
              </div>

              <Field label="Business category" required error={errors.category && 'Choose one'}>
                <select {...register('category', { required: true })} defaultValue="" className={inputClass}>
                  <option value="" disabled>Select one</option>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Services you are interested in" required error={errors.services && 'Select at least one service'}>
                <div className="mt-2 flex flex-wrap gap-2">
                  {serviceOptions.map((s) => (
                    <label key={s} className="cursor-pointer">
                      <input
                        type="checkbox"
                        value={s}
                        {...register('services', { validate: (v) => (v && v.length > 0) || 'Select at least one service' })}
                        className="peer sr-only"
                      />
                      <span className="inline-block rounded-full border border-line bg-card px-4 py-2 text-sm text-muted transition-colors hover:border-violet-soft peer-checked:border-transparent peer-checked:bg-warm-gradient peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-violet-soft">
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Estimated budget" required error={errors.budget && 'Choose one'}>
                  <select {...register('budget', { required: true })} defaultValue="" className={inputClass}>
                    <option value="" disabled>Select one</option>
                    {budgets.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </Field>
                <Field label="When do you want to start?">
                  <select {...register('timeline')} defaultValue="" className={inputClass}>
                    <option value="">Select one</option>
                    {timelines.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Where did you hear about Kaycodings?">
                <select {...register('hearAbout')} defaultValue="" className={inputClass}>
                  <option value="">Select one</option>
                  {sources.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Anything else I should know?">
                <textarea
                  rows={4}
                  {...register('message')}
                  placeholder="Goals, features you want, examples you like..."
                  className={inputClass}
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-full bg-warm-gradient px-6 py-3.5 text-sm font-medium text-white disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send enquiry'}
              </button>

              {status === 'error' && <p className="text-sm text-red-400">{errorMessage}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
