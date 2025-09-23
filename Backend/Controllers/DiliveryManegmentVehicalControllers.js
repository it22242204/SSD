const sanitize = require("mongo-sanitize");
const Vehical = require("../Model/DeliveryManegmentVehicalModel");

// Get all vehicles
const getAllVehical = async (req, res, next) => {
  try {
    const vehi = await Vehical.find();
    if (!vehi || vehi.length === 0) {
      return res.status(404).json({ message: "Vehical not found" });
    }
    return res.status(200).json({ vehi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new vehicle
const addVehical = async (req, res, next) => {
  const { name, gmail, address, phone, numberplate } = sanitize(req.body);
  try {
    const vehi = new Vehical({
      name,
      gmail,
      address,
      phone,
      numberplate,
    });
    await vehi.save();
    return res.status(201).json({ vehi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add Vehical" });
  }
};

// Get vehicle by ID
const getById = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const vehi = await Vehical.findById(id);
    if (!vehi) {
      return res.status(404).json({ message: "Vehical Not Found" });
    }
    return res.status(200).json({ vehi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update vehicle details
const updateVehical = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const { name, gmail, address, phone, numberplate } = sanitize(req.body);

  try {
    let vehis = await Vehical.findByIdAndUpdate(
      id,
      { name, gmail, address, phone, numberplate },
      { new: true }
    );

    if (!vehis) {
      return res
        .status(404)
        .json({ message: "Unable to Update Vehical Details" });
    }
    return res.status(200).json({ vehis });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete vehicle
const deleteVehical = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const vehi = await Vehical.findByIdAndDelete(id);
    if (!vehi) {
      return res
        .status(404)
        .json({ message: "Unable to Delete Vehical Details" });
    }
    return res.status(200).json({ vehi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllVehical = getAllVehical;
exports.addVehical = addVehical;
exports.getById = getById;
exports.updateVehical = updateVehical;
exports.deleteVehical = deleteVehical;
