// In dev, Vite proxies /api to localhost:5000 (see vite.config.js).
// In production, the frontend and backend are on different domains, so
// set VITE_API_URL in Vercel's environment variables to your Render URL,
// e.g. https://kaycodings-server.onrender.com
export const API_BASE = import.meta.env.VITE_API_URL || "";
