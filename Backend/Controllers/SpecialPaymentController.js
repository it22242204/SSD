const sanitize = require("mongo-sanitize");
const SpecialPayment = require("../Model/SpecialPaymentModel");

// Get all special payments
const getAllSpecialPayments = async (req, res) => {
  try {
    const payments = await SpecialPayment.find();
    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No payments found" });
    }
    return res.status(200).json({ payments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add a new special payment
const addSpecialPayment = async (req, res) => {
  const {
    contactname,
    amount,
    currency,
    cardNumber,
    cardExpiry,
    cvv,
    status,
    colletionOption,
  } = sanitize(req.body);

  try {
    const newPayment = new SpecialPayment({
      contactname,
      amount,
      currency,
      cardNumber,
      cardExpiry,
      cvv,
      status,
      colletionOption,
    });

    await newPayment.save();
    return res.status(201).json({ payment: newPayment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get payment by ID
const getSpecialPaymentById = async (req, res) => {
  const id = sanitize(req.params.id);

  try {
    const payment = await SpecialPayment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ payment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update payment by ID
const updateSpecialPayment = async (req, res) => {
  const id = sanitize(req.params.id);
  const {
    contactname,
    amount,
    currency,
    cardNumber,
    cardExpiry,
    cvv,
    status,
    colletionOption,
  } = sanitize(req.body);

  try {
    const payment = await SpecialPayment.findByIdAndUpdate(
      id,
      {
        contactname,
        amount,
        currency,
        cardNumber,
        cardExpiry,
        cvv,
        status,
        colletionOption,
      },
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
const deleteSpecialPayment = async (req, res) => {
  const id = sanitize(req.params.id);

  try {
    const payment = await SpecialPayment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
const createSpecialPayment = async (req, res) => {
  try {
    const safeBody = sanitize(req.body);
    const { userId, details } = safeBody;

    if (!userId || !details) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const sp = new SpecialPayment({
      userId: sanitize(userId),
      details: sanitize(details),
    });

    await sp.save();
    return res.status(201).json({ status: "ok", id: sp._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  getAllSpecialPayments,
  addSpecialPayment,
  getSpecialPaymentById,
  updateSpecialPayment,
  deleteSpecialPayment,
  createSpecialPayment,
};
