const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Submit contact form
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({ 
      message: 'Message sent successfully',
      contact 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all messages (admin)
router.get('/', async (_req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark as read
router.patch('/:id/read', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
