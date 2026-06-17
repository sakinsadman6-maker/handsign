const express  = require('express');
const router   = express.Router();
const Recording = require('../models/Recording');

// GET all recordings (newest first, max 20)
router.get('/', async (req, res) => {
  try {
    const recs = await Recording.find().sort({ createdAt: -1 }).limit(20);
    res.json(recs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST save a new recording
router.post('/', async (req, res) => {
  try {
    const { date, size, thumbnail, data, duration } = req.body;
    if (!data) return res.status(400).json({ error: 'data is required' });

    const rec = await Recording.create({ date, size, thumbnail, data, duration });
    res.status(201).json(rec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a recording by id
router.delete('/:id', async (req, res) => {
  try {
    await Recording.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all recordings
router.delete('/', async (req, res) => {
  try {
    await Recording.deleteMany({});
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
