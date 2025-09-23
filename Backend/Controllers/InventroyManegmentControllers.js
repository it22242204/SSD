const sanitize = require("mongo-sanitize");
const Inventory = require("../Model/InventroyManegmentModel");

// Get all inventory
const getAllInventory = async (req, res, next) => {
  try {
    const invent = await Inventory.find();
    if (!invent || invent.length === 0) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    return res.status(200).json({ invent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new inventory item
const addInventory = async (req, res, next) => {
  const { itemname, quantity, price, description } = sanitize(req.body);
  try {
    const invent = new Inventory({
      itemname,
      quantity,
      price,
      description,
    });
    await invent.save();
    return res.status(201).json({ invent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "unable to add Inventory" });
  }
};

// Get inventory item by ID
const getById = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const invent = await Inventory.findById(id);
    if (!invent) {
      return res.status(404).json({ message: "Inventory Not Found" });
    }
    return res.status(200).json({ invent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update inventory item
const updateInventory = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const { itemname, quantity, price, description } = sanitize(req.body);

  try {
    let invents = await Inventory.findByIdAndUpdate(
      id,
      { itemname, quantity, price, description },
      { new: true }
    );

    if (!invents) {
      return res
        .status(404)
        .json({ message: "Unable to Update Inventory Details" });
    }
    return res.status(200).json({ invents });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete inventory item
const deleteInventory = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const invent = await Inventory.findByIdAndDelete(id);
    if (!invent) {
      return res
        .status(404)
        .json({ message: "Unable to Delete Inventory Details" });
    }
    return res.status(200).json({ invent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllInventory = getAllInventory;
exports.addInventory = addInventory;
exports.getById = getById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;
