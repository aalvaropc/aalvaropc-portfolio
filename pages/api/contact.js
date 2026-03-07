import admin from '../../lib/firebase-admin'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE_LENGTH = 500
const MAX_EMAIL_LENGTH = 254

const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 })
    return false
  }

  entry.count++
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  return false
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown'

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: 'Too many requests. Please try again later.' })
  }

  const { email, message, _honeypot } = req.body

  // Honeypot check - bots will fill this hidden field
  if (_honeypot) {
    // Silently accept to not alert bots
    return res.status(200).json({ success: true })
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' })
  }

  const trimmedMessage = message.trim()
  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return res
      .status(400)
      .json({
        error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less`
      })
  }

  let validatedEmail = null
  if (email && typeof email === 'string' && email.trim()) {
    const trimmedEmail = email.trim()
    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({ error: 'Invalid email address' })
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }
    validatedEmail = trimmedEmail
  }

  try {
    const now = new Date()
    const peruTime = new Date(now.getTime() - 5 * 60 * 60 * 1000)
    const fechaEnvioLocal =
      peruTime.toISOString().replace('T', ' ').substring(0, 19) + ' (UTC-5)'

    const docData = {
      texto: trimmedMessage,
      fechaEnvio: fechaEnvioLocal
    }

    if (validatedEmail) {
      docData.email = validatedEmail
    }

    const db = admin.firestore()
    await db.collection('mensajes').add(docData)

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error saving contact message:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
