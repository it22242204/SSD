const sanitize = require("mongo-sanitize");
const Payment = require("../Model/PaymentModel");

// Get all payments
const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find();
    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No payments found" });
    }
    return res.status(200).json({ payments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add a new payment
const addPayment = async (req, res, next) => {
  const {
    amount,
    currency,
    cardNumber,
    cardExpiry,
    cvv,
    status,
    cartItems,
  } = sanitize(req.body);

  try {
    const newPayment = new Payment({
      amount,
      currency,
      cardNumber,
      cardExpiry,
      cvv,
      status,
      cartItems,
    });

    await newPayment.save();
    return res.status(201).json({ payment: newPayment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get payment by ID
const getPaymentById = async (req, res, next) => {
  const id = sanitize(req.params.id);

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ payment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update payment
const updatePayment = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const {
    amount,
    currency,
    cardNumber,
    cardExpiry,
    cvv,
    status,
    cartItems,
  } = sanitize(req.body);

  try {
    const payment = await Payment.findByIdAndUpdate(
      id,
      { amount, currency, cardNumber, cardExpiry, cvv, status, cartItems },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ payment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete payment
const deletePayment = async (req, res, next) => {
  const id = sanitize(req.params.id);

  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllPayments,
  addPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
};
