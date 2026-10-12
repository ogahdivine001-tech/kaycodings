// Simple in-memory limiter: `max` requests per IP every `windowMs`.
export default function makeRateLimit(max, windowMs = 15 * 60 * 1000) {
  const hits = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const recent = (hits.get(req.ip) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      return res
        .status(429)
        .json({
          error:
            "Too many requests from this connection. Please try again later.",
        });
    }
    recent.push(now);
    hits.set(req.ip, recent);
    next();
  };
}
