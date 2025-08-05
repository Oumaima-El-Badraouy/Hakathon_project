const express = require("express");
const connectDB = require("./config/db");
const cors= require("cors");
const app = express();
const PORT = 5001;
const sendEmail = require('./utils/sendEmail');
const Medicine = require('./Models/Medication');
const User = require('./Models/users');
require('dotenv').config();
connectDB();
app.use(express.json());
app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));
// POST => Set new password

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/medications", require("./Routes/medication"));
app.use("/api/users", require("./Routes/users"));
app.use("/api/reminders", require("./Routes/Reminder"));
app.use("/api/contacts", require("./Routes/Contact"));


const checkAndSendReminders = async () => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // مثلا "08:00"

  // جيب جميع الأدوية اللي الوقت ديالها كيتوافق مع الوقت الحالي
  const medsToRemind = await Medicine.find({
    time: currentTime,
    startDate: { $lte: now },
    endDate: { $gte: now }
  }).populate('userId');

  for (const med of medsToRemind) {
    const user = med.userId;
    if (!user || !user.email) continue; // تأكد أنه عندك إيميل

    const subject = `تذكير: خصك تاخذ الدواء ${med.name}`;
    const text = `السلام، هذا تذكير باش تاخذ الدواء "${med.name}" دابا فالوقت ${currentTime}.`;

    try {
      await sendEmail(user.email, subject, text);
    } catch (err) {
      console.error(`فشل الإرسال إلى ${user.email}`, err);
    }
  }
};

// تنفذ هاد الدالة كل دقيقة مثلاً
setInterval(checkAndSendReminders, 60 * 1000);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
