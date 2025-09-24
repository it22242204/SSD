const sanitize = require('mongo-sanitize');
const Payment = require('../Model/PaymentModel');

const MAX_CART_ITEMS = parseInt(process.env.MAX_CART_ITEMS || '500', 10);

// Get all payments
const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find();
    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: 'No payments found' });
    }
    return res.status(200).json({ payments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new payment
const addPayment = async (req, res, next) => {
  const body = sanitize(req.body || {});
  const {
    amount,
    currency,
    cardNumber,
    cardExpiry,
    cvv,
    status,
    cartItems,
  } = body;

  // validate cartItems length to avoid huge JSON bodies
  if (Array.isArray(cartItems) && cartItems.length > MAX_CART_ITEMS) {
    return res.status(413).json({ message: `cartItems too large (max ${MAX_CART_ITEMS})` });
  }

  // NOTE: Storing raw card data is insecure (PCI). Use a payment gateway in production.
  try {
    const newPayment = new Payment({
      amount: sanitize(amount),
      currency: sanitize(currency),
      cardNumber: sanitize(cardNumber),
      cardExpiry: sanitize(cardExpiry),
      cvv: sanitize(cvv),
      status: sanitize(status),
      cartItems: Array.isArray(cartItems) ? cartItems.map(sanitize) : [],
    });
    await newPayment.save();
    return res.status(201).json({ payment: newPayment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Get payment by ID
const getPaymentById = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    return res.status(200).json({ payment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Update payment
const updatePayment = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const body = sanitize(req.body || {});

  if (Array.isArray(body.cartItems) && body.cartItems.length > MAX_CART_ITEMS) {
    return res.status(413).json({ message: `cartItems too large (max ${MAX_CART_ITEMS})` });
  }

  try {
    const payment = await Payment.findByIdAndUpdate(
      id,
      {
        amount: sanitize(body.amount),
        currency: sanitize(body.currency),
        cardNumber: sanitize(body.cardNumber),
        cardExpiry: sanitize(body.cardExpiry),
        cvv: sanitize(body.cvv),
        status: sanitize(body.status),
        cartItems: Array.isArray(body.cartItems) ? body.cartItems.map(sanitize) : [],
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    return res.status(200).json({ payment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Delete payment
const deletePayment = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    return res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllPayments,
  addPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
};
