require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const path       = require('path');

const recordingsRouter = require('./routes/recordings');
const authRouter       = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '200mb' })); // large limit for base64 video
app.use(express.urlencoded({ extended: true, limit: '200mb' }));

// ── Static frontend ────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── API Routes ─────────────────────────────────────────
app.use('/api/recordings', recordingsRouter);
app.use('/api/auth',       authRouter);

// ── MongoDB Connection ─────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 AirDraw server running → http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
