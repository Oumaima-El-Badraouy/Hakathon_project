const express = require("express");
const connectDB = require("./config/db");
const cors= require("cors");
const app = express();
const PORT = 5001;
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


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
