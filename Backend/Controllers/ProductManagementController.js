const sanitize = require("mongo-sanitize");
const Product = require("../Model/ProductManagementModel");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const id = sanitize(req.params.id);
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "No item found" });
    }
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, image, location, price, code } = sanitize(req.body);

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const product = new Product({
      name,
      image,
      location,
      price,
      code,
    });
    await product.save();
    res.status(201).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const id = sanitize(req.params.id);
  const { name, image, location, price, code } = sanitize(req.body);

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.image = image;
    product.location = location;
    product.price = price;
    product.code = code;

    await product.save();
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const id = sanitize(req.params.id);
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
