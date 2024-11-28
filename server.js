const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const vendorRoutes = require("./routes/vendorRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/vendors", vendorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));