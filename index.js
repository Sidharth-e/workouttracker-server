require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const verifyToken= require( "./middleware/auth");
const connection = require("./db");
const registerRoutes = require("./routes/registerRoutes");
const userRoutes = require("./routes/user");
const removeRoutes = require("./routes/remove");
const authRoutes = require("./routes/auth");
const watertrackerRoutes = require("./routes/waterTrackerRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const dietRoutes = require("./routes/dietRoutes");



const adminRoutes = require("./routes/adminRoutes");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/register",registerRoutes);
app.use("/api/user",verifyToken, userRoutes);
app.use("/api/remove", removeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/waterIntake",verifyToken, watertrackerRoutes);
app.use("/api/workout",verifyToken, workoutRoutes);
app.use("/api/diet",verifyToken, dietRoutes);


// Admin
app.use("/api/admin",verifyToken, adminRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
