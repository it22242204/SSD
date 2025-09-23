const sanitize = require("mongo-sanitize");
const Drive = require("../Model/DeliveryManegmentDriveModel");

// Get all drivers
const getAllDrive = async (req, res, next) => {
  try {
    const driv = await Drive.find();
    if (!driv || driv.length === 0) {
      return res.status(404).json({ message: "Drive not found" });
    }
    return res.status(200).json({ driv });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new driver
const addDrive = async (req, res, next) => {
  const { name, gmail, address, phone } = sanitize(req.body);
  try {
    const driv = new Drive({
      name,
      gmail,
      address,
      phone,
    });
    await driv.save();
    return res.status(201).json({ driv });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add Drive" });
  }
};

// Get driver by ID
const getById = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const driv = await Drive.findById(id);
    if (!driv) {
      return res.status(404).json({ message: "Drive Not Found" });
    }
    return res.status(200).json({ driv });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update driver details
const updateDrive = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const { name, gmail, address, phone } = sanitize(req.body);

  try {
    let drivs = await Drive.findByIdAndUpdate(
      id,
      { name, gmail, address, phone },
      { new: true }
    );

    if (!drivs) {
      return res
        .status(404)
        .json({ message: "Unable to Update Drive Details" });
    }
    return res.status(200).json({ drivs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete driver
const deleteDrive = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const driv = await Drive.findByIdAndDelete(id);
    if (!driv) {
      return res
        .status(404)
        .json({ message: "Unable to Delete Drive Details" });
    }
    return res.status(200).json({ driv });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllDrive = getAllDrive;
exports.addDrive = addDrive;
exports.getById = getById;
exports.updateDrive = updateDrive;
exports.deleteDrive = deleteDrive;
