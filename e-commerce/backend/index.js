import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
// Removed the uploadRoutes import
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
    origin: "https://shopifyi.netlify.app",
    methods: "*",
    credentials: true, // send cookies or auth headers
  })
);

// Removed local upload logic

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
// Removed the upload route
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
