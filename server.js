const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
// Test route
app.use("/api/v1/test", require("./routes/testRoutes"));
// Auth routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
// Inventory routes
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
// Analytics routes
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
// Admin routes
 app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Define port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`.bgBlue.white
  );
});
