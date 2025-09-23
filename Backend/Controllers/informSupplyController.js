const sanitize = require("mongo-sanitize");
const Inform = require("../Model/informSupplyModel");

// Get all inform entries
const getAllInform = async (req, res, next) => {
  try {
    const info = await Inform.find();
    if (!info || info.length === 0) {
      return res.status(404).json({ message: "Inform not found" });
    }
    return res.status(200).json({ info });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new inform entry
const addInform = async (req, res, next) => {
  const { itemname, quantity, price, description } = sanitize(req.body);
  try {
    const info = new Inform({
      itemname,
      quantity,
      price,
      description,
    });
    await info.save();
    return res.status(201).json({ info });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add Inform" });
  }
};

// Get inform entry by ID
const getById = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const info = await Inform.findById(id);
    if (!info) {
      return res.status(404).json({ message: "Inform Not Found" });
    }
    return res.status(200).json({ info });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update inform entry
const updateInform = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const { itemname, quantity, price, description } = sanitize(req.body);

  try {
    let infos = await Inform.findByIdAndUpdate(
      id,
      { itemname, quantity, price, description },
      { new: true }
    );

    if (!infos) {
      return res.status(404).json({ message: "Unable to Update Inform Details" });
    }
    return res.status(200).json({ infos });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete inform entry
const deleteInform = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const info = await Inform.findByIdAndDelete(id);
    if (!info) {
      return res.status(404).json({ message: "Unable to Delete Inform Details" });
    }
    return res.status(200).json({ info });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllInform = getAllInform;
exports.addInform = addInform;
exports.getById = getById;
exports.updateInform = updateInform;
exports.deleteInform = deleteInform;
