// Packages
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

//cors
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

//deploy
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://e-comm-aman-store.vercel.app",
];

// ✅ ADD PRODUCTION FRONTEND URL FROM ENV
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

// ✅ IMPROVED CORS CONFIGURATION
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`⚠️  CORS blocked origin: ${origin}`);
        console.log(`   Allowed origins: ${allowedOrigins.join(", ")}`);
        callback(null, true); // Still allow for debugging
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ ROOT ROUTE - Critical for health checks and API verification
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ✅ HEALTH CHECK ENDPOINT
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is healthy" });
});

// Mount the user routes for all methods (GET, POST, etc.)
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);

app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// ✅ STATIC FILE SERVING - PRODUCTION READY
// Using ES modules, we need to construct __dirname differently
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads folder
const uploadsPath = path.join(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsPath));

// Log static file serving setup
console.log(`📁 Static files served from: ${uploadsPath}`);

// ✅ START SERVER WITH ERROR LOGGING
const server = app.listen(port, () => {
  console.log(`\n========================================`);
  console.log(`✅ Server running on port: ${port}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 CORS Origins: ${allowedOrigins.join(", ")}`);
  console.log(`========================================\n`);
});

// ✅ GRACEFUL SHUTDOWN
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
