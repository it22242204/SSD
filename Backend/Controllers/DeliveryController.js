const sanitize = require("mongo-sanitize");
const Delivery = require("../Model/DeliveryModel");

// Get all deliveries
const getAllDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find();
    if (!deliveries || deliveries.length === 0) {
      return res.status(404).json({ message: "No deliveries found" });
    }
    return res.status(200).json({ deliveries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get delivery by ID
const getDeliveryById = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const deliveries = await Delivery.findById(id);
    if (!deliveries) {
      return res.status(404).json({ message: "Delivery Not Found" });
    }
    return res.status(200).json({ deliveries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add new delivery
const addDelivery = async (req, res, next) => {
  const { name, gmail, phone, locatin, status } = sanitize(req.body);
  try {
    const newDelivery = new Delivery({
      name,
      gmail,
      phone,
      locatin,
      status,
    });
    await newDelivery.save();
    return res.status(201).json({ delivery: newDelivery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add delivery" });
  }
};

// Update delivery by ID
const updateDelivery = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const { name, gmail, phone, locatin, status } = sanitize(req.body);

  try {
    let deliveries = await Delivery.findByIdAndUpdate(id, {
      name,
      gmail,
      phone,
      locatin,
      status,
    }, { new: true });

    if (!deliveries) {
      return res
        .status(404)
        .json({ message: "Unable to Update Delivery Details" });
    }
    return res.status(200).json({ deliveries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete delivery by ID
const deleteDelivery = async (req, res, next) => {
  const id = sanitize(req.params.id);

  try {
    const delivery = await Delivery.findByIdAndDelete(id);
    if (!delivery) {
      return res
        .status(404)
        .json({ message: "Unable to delete delivery details" });
    }
    return res.status(200).json({ delivery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllDeliveries,
  getDeliveryById,
  addDelivery,
  updateDelivery,
  deleteDelivery,
};
