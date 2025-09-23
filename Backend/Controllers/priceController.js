const sanitize = require("mongo-sanitize");
const Payment = require("../Model/PriceModel"); // Ensure your Price model is correctly imported

// Controller to fetch all payment items
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No payment items found." });
    }
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payment data:", error);
    res.status(500).json({ message: "Error fetching payment data." });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const id = sanitize(req.params.id);
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ message: "Error fetching payment." });
  }
};

// Controller to add a new payment item
const addPayment = async (req, res) => {
  const {
    email,
    wasteDetails,
    subtotal,
    address,
    date,
    time,
    paymentMethod,
    cardDetails,
  } = sanitize(req.body);

  // Validate the input data
  if (!email || !wasteDetails || subtotal < 0 || !paymentMethod) {
    return res.status(400).json({ message: "Invalid input data." });
  }

  try {
    const newPayment = new Payment({
      email,
      wasteDetails,
      subtotal,
      address,
      date,
      time,
      paymentMethod,
      cardDetails,
    });
    await newPayment.save();
    res
      .status(201)
      .json({ message: "Payment item added successfully!", payment: newPayment });
  } catch (error) {
    console.error("Error adding payment item:", error);
    res.status(500).json({ message: "Error adding payment item.", error });
  }
};

// Controller to update the status of a payment item
const updatePaymentStatus = async (req, res) => {
  const id = sanitize(req.params.id);
  const { status } = sanitize(req.body);

  if (!status) {
    return res.status(400).json({ message: "Status is required." });
  }

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    res.status(200).json({
      message: "Payment status updated successfully!",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res
      .status(500)
      .json({ message: "Error updating payment status.", error });
  }
};

module.exports = {
  getAllPayments,
  addPayment,
  getPaymentById,
  updatePaymentStatus,
};
