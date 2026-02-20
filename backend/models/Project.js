const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '🚀'
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'fullstack'],
    required: true
  },
  tech: [{
    type: String
  }],
  github: String,
  demo: String,
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
