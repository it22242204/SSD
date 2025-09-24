const sanitize = require("mongo-sanitize");
const Order = require("../Model/Specialordermodel");

// Max items allowed in listofitems / items to prevent huge payload processing
const MAX_ITEMS = parseInt(process.env.MAX_SPECIAL_ORDER_ITEMS || "500", 10);

// Display all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }
    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Add new order (with size check for listofitems)
const addOrders = async (req, res) => {
  const body = sanitize(req.body || {});
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
  } = body;

  // Protect against huge arrays
  if (Array.isArray(listofitems) && listofitems.length > MAX_ITEMS) {
    return res.status(413).json({ message: `Too many items (max ${MAX_ITEMS})` });
  }

  try {
    const orders = new Order({
      contactname: sanitize(contactname),
      typeofuser: sanitize(typeofuser),
      contactemail: sanitize(contactemail),
      address: sanitize(address),
      listofitems: Array.isArray(listofitems) ? listofitems.map(sanitize) : [],
      prefereddate: sanitize(prefereddate),
      preferedtime: sanitize(preferedtime),
      totalweight: sanitize(totalweight),
      totalamount: sanitize(totalamount),
      status: sanitize(status),
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

// Update order (with size check for listofitems)
const updateOrder = async (req, res) => {
  const id = sanitize(req.params.id);
  const body = sanitize(req.body || {});

  if (Array.isArray(body.listofitems) && body.listofitems.length > MAX_ITEMS) {
    return res.status(413).json({ message: `Too many items (max ${MAX_ITEMS})` });
  }

  try {
    const updated = await Order.findByIdAndUpdate(
      id,
      {
        contactname: sanitize(body.contactname),
        typeofuser: sanitize(body.typeofuser),
        contactemail: sanitize(body.contactemail),
        address: sanitize(body.address),
        listofitems: Array.isArray(body.listofitems) ? body.listofitems.map(sanitize) : [],
        prefereddate: sanitize(body.prefereddate),
        preferedtime: sanitize(body.preferedtime),
        totalweight: sanitize(body.totalweight),
        totalamount: sanitize(body.totalamount),
        status: sanitize(body.status),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Unable to update order details" });
    }
    return res.status(200).json({ order: updated });
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

// Update status only (small payload)
const updateStatus = async (req, res) => {
  const id = sanitize(req.params.id);
  const { status } = sanitize(req.body || {});

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status: sanitize(status) }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Unable to update order status" });
    }
    return res.status(200).json({ updatedOrder });
  } catch (err) {
    console.error("Error updating order status:", err);
    return res.status(500).json({ message: "Failed to update order status" });
  }
};

// placeSpecialOrder - additional endpoint that may accept 'items' (or listofitems)
const placeSpecialOrder = async (req, res) => {
  try {
    const safeBody = sanitize(req.body || {});
    // support both possible field names
    const items = safeBody.items || safeBody.listofitems;
    const userId = safeBody.userId || safeBody.user_id || safeBody.user;

    if (!items || !userId) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (Array.isArray(items) && items.length > MAX_ITEMS) {
      return res.status(413).json({ message: `Too many items (max ${MAX_ITEMS})` });
    }

    const so = new Order({
      items: Array.isArray(items) ? items.map(sanitize) : sanitize(items),
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
