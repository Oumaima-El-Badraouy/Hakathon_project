const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String }, // مثلاً: "500mg"
  frequency: { type: String }, // مثلاً: "مرتين في اليوم"
  time: { type: [String] }, // أوقات التناول: ["08:00", "20:00"]
  startDate: { type: Date },
  endDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // إذا عندك system d'utilisateur
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
