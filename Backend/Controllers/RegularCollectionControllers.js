const sanitize = require("mongo-sanitize");
const RegularCollection = require("../Model/RegularCollectionModel");

// Get all Regular Collections
const getAllRegularCollection = async (req, res, next) => {
  try {
    const regularCollections = await RegularCollection.find();
    if (!regularCollections || regularCollections.length === 0) {
      return res.status(404).json({ message: "RegularCollection not found" });
    }
    return res.status(200).json({ regularCollections });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add Regular Collection
const addRegularCollection = async (req, res, next) => {
  const { TypeofUser, Name, PhoneNumber, Address, ColletionOption, Amount } = sanitize(req.body);

  try {
    const regularCollection = new RegularCollection({
      TypeofUser,
      Name,
      PhoneNumber,
      Address,
      ColletionOption,
      Amount,
    });

    await regularCollection.save();
    return res.status(201).json({ regularCollection });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add RegularCollection" });
  }
};

// Retrieve Regular Collection by ID
const getById = async (req, res, next) => {
  const id = sanitize(req.params.id);

  try {
    const regularCollection = await RegularCollection.findById(id);
    if (!regularCollection) {
      return res.status(404).json({ message: "RegularCollection Not Found" });
    }
    return res.status(200).json({ regularCollection });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update Regular Collection
const updateRegularCollection = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const { TypeofUser, Name, PhoneNumber, Address, ColletionOption, Amount } = sanitize(req.body);

  try {
    const regularCollection = await RegularCollection.findByIdAndUpdate(
      id,
      { TypeofUser, Name, PhoneNumber, Address, ColletionOption, Amount },
      { new: true }
    );

    if (!regularCollection) {
      return res.status(404).json({ message: "Unable to Update RegularCollection Details" });
    }
    return res.status(200).json({ regularCollection });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete Regular Collection
const deleteRegularCollection = async (req, res, next) => {
  const id = sanitize(req.params.id);

  try {
    const regularCollection = await RegularCollection.findByIdAndDelete(id);
    if (!regularCollection) {
      return res.status(404).json({ message: "Unable to Delete RegularCollection Details" });
    }
    return res.status(200).json({ message: "Deleted successfully", regularCollection });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Additional secure requestCollection method
const requestCollection = async (req, res) => {
  try {
    const safeBody = sanitize(req.body);
    const { address, type } = safeBody;
    if (!address || !type) return res.status(400).json({ error: "Missing fields" });

    const rc = new RegularCollection({ address: sanitize(address), type: sanitize(type) });
    await rc.save();
    return res.status(201).json({ status: "ok", id: rc._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Export all functions together
module.exports = {
  getAllRegularCollection,
  addRegularCollection,
  getById,
  updateRegularCollection,
  deleteRegularCollection,
  requestCollection,
};
