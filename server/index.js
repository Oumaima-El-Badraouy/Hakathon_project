const express = require("express");
const connectDB = require("./config/db");
const cors= require("cors");
const app = express();
const PORT = 5001;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/medications", require("./Routes/medication"));
app.use("/api/users", require("./Routes/users"));
app.use("/api/reminders", require("./Routes/Reminder"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
