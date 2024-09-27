import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fs from "fs";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";

// Utils
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Enable CORS for all routes
app.use(
  cors({
    origin: "https://shopifyi.netlify.app", // Your frontend URL
    credentials: true, // If you need to send cookies or auth headers
  })
);

// Check if uploads directory exists, create if not
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.use("/uploads", express.static(uploadDir));

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
