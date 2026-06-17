const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
  date:      { type: String, required: true },
  size:      { type: String },           // MB as string e.g. "1.24"
  thumbnail: { type: String },           // base64 JPEG data URL
  data:      { type: String, required: true }, // base64 webm data URL
  duration:  { type: Number },           // seconds
}, { timestamps: true });

module.exports = mongoose.model('Recording', recordingSchema);
