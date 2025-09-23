const sanitize = require("mongo-sanitize");
const Employee = require("../Model/EmployeManegmentModel");

// Get all employees
const getAllEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.find();
    if (!emp || emp.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json({ emp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new employee
const addEmployee = async (req, res, next) => {
  const { name, gmail, address, phone } = sanitize(req.body);
  try {
    const emp = new Employee({
      name,
      gmail,
      address,
      phone,
    });
    await emp.save();
    return res.status(201).json({ emp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add Employee" });
  }
};

// Get employee by ID
const getById = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const emp = await Employee.findById(id);
    if (!emp) {
      return res.status(404).json({ message: "Employee Not Found" });
    }
    return res.status(200).json({ emp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update employee details
const updateEmployee = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const { name, gmail, address, phone } = sanitize(req.body);

  try {
    let emps = await Employee.findByIdAndUpdate(
      id,
      { name, gmail, address, phone },
      { new: true }
    );

    if (!emps) {
      return res
        .status(404)
        .json({ message: "Unable to Update Employee Details" });
    }
    return res.status(200).json({ emps });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete employee
const deleteEmployee = async (req, res, next) => {
  const id = sanitize(req.params.id);
  try {
    const emp = await Employee.findByIdAndDelete(id);
    if (!emp) {
      return res
        .status(404)
        .json({ message: "Unable to Delete Employee Details" });
    }
    return res.status(200).json({ emp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllEmployee = getAllEmployee;
exports.addEmployee = addEmployee;
exports.getById = getById;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
