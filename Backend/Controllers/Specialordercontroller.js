const sanitize = require("mongo-sanitize");
const Order = require("../Model/Specialordermodel");
// Display all orders
const getAllOrders = async (req, res) => {
  try {
    const Orders = await Order.find();
    if (!Orders || Orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }
    return res.status(200).json({ Orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add new order
const addOrders = async (req, res) => {
  const {
    contactname,
    typeofuser,
    contactemail,
    address,
    listofitems,
    prefereddate,
    preferedtime,
    totalweight,
    totalamount,
    status,
  } = sanitize(req.body);

  try {
    const orders = new Order({
      contactname,
      typeofuser,
      contactemail,
      address,
      listofitems,
      prefereddate,
      preferedtime,
      totalweight,
      totalamount,
      status,
    });

    await orders.save();
    return res.status(201).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add orders" });
  }
};

// Get by ID
const getById = async (req, res) => {
  const id = sanitize(req.params.id);

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update order
const updateOrder = async (req, res) => {
  const id = sanitize(req.params.id);
  const {
    contactname,
    typeofuser,
    contactemail,
    address,
    listofitems,
    prefereddate,
    preferedtime,
    totalweight,
    totalamount,
    status,
  } = sanitize(req.body);

  try {
    const orders = await Order.findByIdAndUpdate(
      id,
      {
        contactname,
        typeofuser,
        contactemail,
        address,
        listofitems,
        prefereddate,
        preferedtime,
        totalweight,
        totalamount,
        status,
      },
      { new: true }
    );

    if (!orders) {
      return res.status(404).json({ message: "Unable to update order details" });
    }
    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  const id = sanitize(req.params.id);

  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Unable to delete order" });
    }
    return res.status(200).json({ message: "Order deleted successfully", order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update status only
const updateStatus = async (req, res) => {
  const id = sanitize(req.params.id);
  const { status } = sanitize(req.body);

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Unable to update order status" });
    }
    return res.status(200).json({ updatedOrder });
  } catch (err) {
    console.error("Error updating order status:", err);
    return res.status(500).json({ message: "Failed to update order status" });
  }
};
const placeSpecialOrder = async (req, res) => {
  try {
    const safeBody = sanitize(req.body);
    const { items, userId } = safeBody;
    if (!items || !userId) return res.status(400).json({ error: "Missing fields" });

    const so = new Order({
      items: sanitize(items),
      userId: sanitize(userId),
    });

    await so.save();
    return res.status(201).json({ status: "ok", orderId: so._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllOrders,
  addOrders,
  getById,
  updateOrder,
  deleteOrder,
  updateStatus,
  placeSpecialOrder,
};
