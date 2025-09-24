const sanitize = require("mongo-sanitize");
const Supplier = require("../Model/SupplyManegmentModel");

// Get all suppliers
const getAllSupplier = async (req, res) => {
  try {
    const supply = await Supplier.find();
    if (!supply || supply.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    return res.status(200).json({ supply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add supplier
const addSupplier = async (req, res) => {
  const { firstname, lastname, phone, address, gmail } = sanitize(req.body);

  try {
    const supply = new Supplier({
      firstname,
      lastname,
      phone,
      address,
      gmail,
    });

    await supply.save();
    return res.status(201).json({ supply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add Supplier" });
  }
};

// Get supplier by Id
const getById = async (req, res) => {
  const id = sanitize(req.params.id);

  try {
    const supply = await Supplier.findById(id);
    if (!supply) {
      return res.status(404).json({ message: "Supplier Not Found" });
    }
    return res.status(200).json({ supply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update supplier
const updateSupplier = async (req, res) => {
  const id = sanitize(req.params.id);
  const { firstname, lastname, phone, address, gmail } = sanitize(req.body);

  try {
    let supply = await Supplier.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        phone,
        address,
        gmail,
      },
      { new: true }
    );

    if (!supply) {
      return res.status(404).json({ message: "Unable to Update Supplier Details" });
    }

    return res.status(200).json({ supply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete supplier
const deleteSupplier = async (req, res) => {
  const id = sanitize(req.params.id);

  try {
    const supply = await Supplier.findByIdAndDelete(id);
    if (!supply) {
      return res.status(404).json({ message: "Unable to Delete Supplier Details" });
    }
    return res.status(200).json({ supply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
const addSupply = async (req, res) => {
  try {
    const safeBody = sanitize(req.body);
    const { supplierName, product } = safeBody;

    if (!supplierName || !product) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const s = new Supplier({
      supplierName: sanitize(supplierName),
      product: sanitize(product),
    });

    await s.save();
    return res.status(201).json({ status: "ok", id: s._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  getAllSupplier,
  addSupplier,
  getById,
  updateSupplier,
  deleteSupplier,
  addSupply,
};
