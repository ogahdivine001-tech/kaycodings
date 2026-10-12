# Kaycodings

Digital solutions for businesses ready to grow. A two-part project: a React
client and a Node/Express server.

## Setup

### Client

```
cd client
npm install
npm run dev
```

Runs at http://localhost:5173

### Server

```
cd server
npm install
cp .env.example .env
```

Fill in `.env` with your MongoDB Atlas URI and AI API key, then:

```
npm run dev
```

Runs at http://localhost:5000

## Structure

- `client/` React + Vite + Tailwind + Framer Motion frontend
- `server/` Express API with MongoDB models for enquiries and newsletter subscribers, plus a Kay AI chat endpoint

## Pages

Home, Services, Work, About, Process, Partners, Contact. Work and Partners
are currently placeholders, marked clearly in the code, waiting for real
client projects and confirmed partnerships.

## Notes

- No fake clients, testimonials, or stats are included anywhere.
- The AI chat route expects `AI_API_KEY` in the server `.env`. It will
  return a clear error if the key is missing rather than failing silently.
