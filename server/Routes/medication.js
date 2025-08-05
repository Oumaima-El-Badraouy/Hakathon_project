const express = require('express');
const router = express.Router();
const medicines = require('../Models/Medication');
const { userAuth } = require("../middleware/Auth");
// Ajouter un médicament
router.post('/', userAuth, async (req, res) => {
  try {
    const med = new medicines({
      ...req.body,
      userId: req.user.id, // ✅ ربط الدواء بالمستخدم
    });
    const saved = await med.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lister les médicaments
router.get('/', userAuth, async (req, res) => {
  try {
    const meds = await medicines.find({ userId: req.user.id }); // ✅ user-specific
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Modifier un médicament
router.put('/:id', userAuth, async (req, res) => {
  try {
    const updated = await medicines.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supprimer un médicament
router.delete('/:id', userAuth, async (req, res) => {
  try {
    const deleted = await medicines.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
