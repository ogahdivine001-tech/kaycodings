import { Router } from 'express'

const router = Router()

const SYSTEM_PROMPT =
  'You are Kay, the website assistant for Kaycodings, a one-person web development and design studio run by Ogah Divine in Lagos, Nigeria. ' +
  'Kaycodings builds websites, e-commerce stores, branding, UI/UX design, web apps and AI tools for businesses. ' +
  'Answer questions about services and process briefly and helpfully. ' +
  'Do not quote prices or promise delivery dates: say that quotes are given after the visitor sends their details through the contact form. ' +
  'If you are unsure about anything, suggest the contact form. Refer to the studio as Kaycodings or to Ogah by name.'

// Kay AI chat endpoint, using the Gemini API free tier. Keep the API key
// server-side only, never in the client. Swap the model string below for a
// paid provider later without changing anything on the frontend.
router.post('/chat', async (req, res) => {
  const { message } = req.body
  const apiKey = process.env.AI_API_KEY

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' })
  }

  if (!apiKey) {
    return res.status(503).json({ error: 'AI_API_KEY is not configured on the server yet.' })
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: message }] }]
        })
      }
    )

    const data = await response.json()

    if (data.error) {
      console.error(data.error)
      return res.status(502).json({ error: 'AI provider returned an error.' })
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a reply.'
    res.json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'AI request failed.' })
  }
})

export default router
