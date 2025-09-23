const sanitize = require("mongo-sanitize");
const RegisterUserPayment = require("../Model/RegisterUserPaymentModel");

// Get all user register payments
const getAllUserRegisterPayments = async (req, res, next) => {
  try {
    const payments = await RegisterUserPayment.find();
    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No payments found" });
    }
    return res.status(200).json({ payments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add a new user register payment
const addUserRegisterPayment = async (req, res, next) => {
  const { amount, currency, cardNumber, cardExpiry, cvv, status, name, colletionOption } = sanitize(req.body);

  try {
    const newPayment = new RegisterUserPayment({
      amount,
      currency,
      cardNumber,
      cardExpiry,
      cvv,
      status,
      name,
      colletionOption,
    });

    await newPayment.save();
    return res.status(201).json({ payment: newPayment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get a single user register payment by ID
const getUserRegisterPaymentById = async (req, res, next) => {
  const id = sanitize(req.params.id);

  try {
    const payment = await RegisterUserPayment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ payment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update a user register payment by ID
const updateUserRegisterPayment = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const { amount, currency, cardNumber, cardExpiry, cvv, status, name, colletionOption } = sanitize(req.body);

  try {
    const payment = await RegisterUserPayment.findByIdAndUpdate(
      id,
      { amount, currency, cardNumber, cardExpiry, cvv, status, name, colletionOption },
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

// Delete a user register payment by ID
const deleteUserRegisterPayment = async (req, res, next) => {
  const id = sanitize(req.params.id);

  try {
    const payment = await RegisterUserPayment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Additional secure function (minimal version)
const registerPayment = async (req, res) => {
  try {
    const safeBody = sanitize(req.body);
    const { userId, amount } = safeBody;
    if (!userId || !amount) return res.status(400).json({ error: "Missing fields" });

    const rp = new RegisterUserPayment({ userId: sanitize(userId), amount: sanitize(amount) });
    await rp.save();
    return res.status(201).json({ status: "ok", id: rp._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  getAllUserRegisterPayments,
  addUserRegisterPayment,
  getUserRegisterPaymentById,
  updateUserRegisterPayment,
  deleteUserRegisterPayment,
  registerPayment,
};
