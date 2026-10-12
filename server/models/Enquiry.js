import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, maxlength: 60 },
    lastName: { type: String, maxlength: 60 },
    email: { type: String, required: true, maxlength: 120 },
    whatsapp: { type: String, required: true, maxlength: 30 },
    business: { type: String, required: true, maxlength: 120 },
    category: { type: String, required: true, maxlength: 80 },
    services: { type: [String], default: [] },
    budget: { type: String, required: true, maxlength: 80 },
    timeline: { type: String, maxlength: 80 },
    hearAbout: { type: String, maxlength: 80 },
    currentWebsite: { type: String, maxlength: 200 },
    message: { type: String, maxlength: 3000 },
    emailStatus: { type: String, maxlength: 400 },
    status: { type: String, default: "new" },
  },
  { timestamps: true },
);

export default mongoose.model("Enquiry", enquirySchema);
