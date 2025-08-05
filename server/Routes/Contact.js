const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact');

// Ajouter un contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
   res.status(201).json({
      message: "توصلنا برسالتك! شكراً على التواصل 🙏",
      data: saved
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lister les contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;