const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
