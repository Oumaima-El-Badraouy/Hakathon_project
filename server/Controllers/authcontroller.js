const User = require('../Models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Create reset link
    const link = `http://localhost:5173/api/auth/reset-password/${token}`;

    // Send email (mock function or real)
    await sendEmail(email, 'Réinitialisation du mot de passe', `Cliquez ici: ${link}`);

    res.status(200).json({ message: 'Lien de réinitialisation envoyé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (error) {
    res.status(400).json({ message: 'Lien invalide ou expiré.' });
  }
};
