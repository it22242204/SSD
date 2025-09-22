const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const app = express();

// Import Passport Config
require("./Config/passport.js");

// Import Routes
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

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow React frontend
app.use(express.json());
// Rate limiting for authentication and OAuth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: "Too many authentication attempts from this IP, please try again later."
});

app.use("/login", authLimiter);
app.use("/auth/google", authLimiter);
app.use("/auth/google/callback", authLimiter);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true in production with HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
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

// Google OAuth Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to profile
        res.redirect('http://localhost:3000/afetrhome');
    }
);

// Logout Route
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('http://localhost:3000/');
    });
});

// Set the PORT
const PORT = process.env.PORT || 8081;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});