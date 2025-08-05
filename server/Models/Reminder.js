const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  medication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medication',
    required: true
  },
  time: {
    type: String, // ex: "08:00", "14:30"
    required: true
  },
  repeatEveryDay: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['pending', 'taken', 'missed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
