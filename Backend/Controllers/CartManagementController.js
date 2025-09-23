const sanitize = require("mongo-sanitize");
const Cart = require("../Model/CartManagementModel");

// Get all carts
const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }
    return res.status(200).json({ carts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get cart by ID
const getCartById = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add new cart item
const addCart = async (req, res, next) => {
  const { name, image, location, price, code, qty, total } = sanitize(req.body);
  try {
    const cart = new Cart({
      name,
      image,
      location,
      price,
      code,
      qty,
      total,
    });
    await cart.save();
    return res.status(201).json({ cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update cart by ID
const updateCart = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const { name, image, location, price, code, qty, total } = sanitize(req.body);
  try {
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({ message: "Item not found" });
    }
    cart.name = name;
    cart.image = image;
    cart.location = location;
    cart.price = price;
    cart.code = code;
    cart.qty = qty;
    cart.total = total;

    await cart.save();
    return res.status(200).json({ cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete cart by ID
const deleteCart = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  addCart,
  updateCart,
  deleteCart,
};
