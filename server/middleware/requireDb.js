import mongoose from "mongoose";

// Fails fast with a clear message when MongoDB is not connected,
// instead of hanging for 10 seconds and then returning a vague error.
export default function requireDb(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    console.error(
      `Request blocked: MongoDB is not connected (state ${mongoose.connection.readyState}). Check MONGO_URI and Atlas Network Access.`,
    );
    return res
      .status(503)
      .json({
        error:
          "The database is not connected yet. Please email or WhatsApp instead.",
      });
  }
  next();
}
