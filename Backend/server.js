// server.js
require("dotenv").config(); // npm i dotenv
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
const cors = require("cors");
const helmet = require("helmet"); // npm i helmet
const rateLimit = require("express-rate-limit"); // npm i express-rate-limit
const slowDown = require("express-slow-down"); // npm i express-slow-down
const { checkContentLength } = require("./Backend/Middleware/requestLimits"); // create this file as shown in the tutorial

const app = express();

// Import Routes (preserve your original names/paths)
const taskRoutes = require("./Routes/taskRoute.js");
const EmployeeRoute = require("./Routes/EmployeManegmentRoutes.js");
const InventoryRoute = require("./Routes/InventroyManegmentRoutes.js");
const RatingRoute = require("./Routes/RatingSystemRoutes.js");
const SupplierRoute = require("./Routes/SupplyManegmentRoutes.js");
const ProductRoute = require("./Routes/ProductManagemnetRoute.js");
const DeliveryDrive = require("./Routes/DiliveryManegmentDriveRoutes.js");
const VehicalDrive = require("./Routes/DiliveryManegmentVehicalRoutes.js");
const CartRoute = require("./Routes/CartManagementRoute.js");
const UserLoginRoute = require("./Routes/UserLoginRoute.js");
const UserRoute = require("./Routes/UserManagementRoutes.js");
const UserProfileRoute = require("./Routes/UserProfileRoute.js");
const DeliveryRoute = require("./Routes/DeliveryRoute.js");
const InformRoute = require("./Routes/informSupplyRoute.js");
const PaymentRoute = require("./Routes/PaymentRoute.js");
const RegularCollectionRoute = require("./Routes/RegularCollectionRoutes.js");
const UserRegisterPaymentRoute = require("./Routes/RegisterUserPaymentRoute.js");
const SpecialPaymentRoute = require("./Routes/SpecialPaymentRoute.js");
const SpecialcollectionRoute = require("./Routes/Specialorderroutes.js");
const priceRoute = require("./Routes/priceRoutes.js");

// Connect to DB
connectDB();

// Configuration (tunable via .env)
const PORT = process.env.PORT || 8081;
const MAX_JSON_SIZE = process.env.MAX_JSON_SIZE || "100kb";
const MAX_URLENCODED_SIZE = process.env.MAX_URLENCODED_SIZE || "100kb";
const MAX_CONTENT_LENGTH = parseInt(process.env.MAX_CONTENT_LENGTH || "1048576", 10); // bytes (1MB default)
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10);
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || "100", 10);
const SLOWDOWN_WINDOW_MS = parseInt(process.env.SLOWDOWN_WINDOW_MS || "60000", 10);
const SLOWDOWN_DELAY_AFTER = parseInt(process.env.SLOWDOWN_DELAY_AFTER || "50", 10);
const SLOWDOWN_DELAY_MS = parseInt(process.env.SLOWDOWN_DELAY_MS || "500", 10);
const SERVER_TIMEOUT_MS = parseInt(process.env.SERVER_TIMEOUT_MS || "30000", 10);

// Middleware
app.use(cors());
app.use(helmet());

// Rate limiter
const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Slow down abusive clients
const speedLimiter = slowDown({
  windowMs: SLOWDOWN_WINDOW_MS,
  delayAfter: SLOWDOWN_DELAY_AFTER,
  delayMs: SLOWDOWN_DELAY_MS,
});
app.use(speedLimiter);

// Check Content-Length early (reject very large declared payloads)
app.use(checkContentLength(MAX_CONTENT_LENGTH));

// Body parsers with explicit sizes
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: true, limit: MAX_URLENCODED_SIZE }));

// Routes (same as your original mapping)
app.use("/api/tasks", taskRoutes);
app.use("/employee", EmployeeRoute);
app.use("/inventory", InventoryRoute);
app.use("/rates", RatingRoute);
app.use("/supplier", SupplierRoute);
app.use("/products", ProductRoute);
app.use("/drive", DeliveryDrive);
app.use("/vehical", VehicalDrive);
app.use("/carts", CartRoute);
app.use("/user", UserRoute);
app.use("/login", UserLoginRoute);
app.use("/profile", UserProfileRoute);
app.use("/deliveri", DeliveryRoute);
app.use("/payments", PaymentRoute);
app.use("/inform", InformRoute);
app.use("/regularcollection", RegularCollectionRoute);
app.use("/userregisterpayment", UserRegisterPaymentRoute);
app.use("/specialpayment", SpecialPaymentRoute);
app.use("/api/payment", priceRoute);
app.use("/orders", SpecialcollectionRoute);

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler (do not leak internals)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (!res.headersSent) {
    res.status(500).json({ message: "Internal server error" });
  } else {
    next(err);
  }
});

// Start server with a timeout to mitigate slowloris-style attacks
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
server.setTimeout(SERVER_TIMEOUT_MS);

// Export server for testing (optional)
module.exports = server;
