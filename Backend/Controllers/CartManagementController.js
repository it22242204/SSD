const sanitize = require('mongo-sanitize');
const Cart = require('../Model/CartManagementModel');

const MAX_FIELD_LENGTH = parseInt(process.env.MAX_FIELD_LENGTH || '1000', 10);

// Get all carts
const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: 'No items found' });
    }
    return res.status(200).json({ carts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get cart by ID
const getCartById = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json({ cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Add new cart item
const addCart = async (req, res, next) => {
  // sanitize body
  const body = sanitize(req.body || {});
  const { name, image, location, price, code, qty, total } = body;

  // Basic length checks to prevent huge strings
  if ((name && String(name).length > MAX_FIELD_LENGTH) ||
      (image && String(image).length > MAX_FIELD_LENGTH) ||
      (location && String(location).length > MAX_FIELD_LENGTH) ||
      (code && String(code).length > MAX_FIELD_LENGTH)) {
    return res.status(413).json({ message: 'One or more fields too large' });
  }

  try {
    const cart = new Cart({
      name: sanitize(name),
      image: sanitize(image),
      location: sanitize(location),
      price: sanitize(price),
      code: sanitize(code),
      qty: sanitize(qty),
      total: sanitize(total),
    });
    await cart.save();
    return res.status(201).json({ cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update cart by ID
const updateCart = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const body = sanitize(req.body || {});
  const { name, image, location, price, code, qty, total } = body;

  if ((name && String(name).length > MAX_FIELD_LENGTH) ||
      (image && String(image).length > MAX_FIELD_LENGTH) ||
      (location && String(location).length > MAX_FIELD_LENGTH) ||
      (code && String(code).length > MAX_FIELD_LENGTH)) {
    return res.status(413).json({ message: 'One or more fields too large' });
  }

  try {
    const cart = await Cart.findById(id);
    if (!cart) return res.status(404).json({ message: 'Item not found' });

    cart.name = sanitize(name);
    cart.image = sanitize(image);
    cart.location = sanitize(location);
    cart.price = sanitize(price);
    cart.code = sanitize(code);
    cart.qty = sanitize(qty);
    cart.total = sanitize(total);

    await cart.save();
    return res.status(200).json({ cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete cart by ID
const deleteCart = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  addCart,
  updateCart,
  deleteCart,
};
