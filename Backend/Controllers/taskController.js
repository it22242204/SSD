const mongoose = require("mongoose");
const sanitize = require("mongo-sanitize");
const Task = require("../Model/TaskModel");

// Create Task
const createTask = async (req, res) => {
  try {
    const safeBody = sanitize(req.body);
    const {
      customername,
      email,
      topic,
      description,
      responce,
      ticketstatus,
    } = safeBody;

    if (!customername || !topic) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const task = new Task({
      customername: sanitize(customername),
      email: sanitize(email),
      topic: sanitize(topic),
      description: sanitize(description),
      responce: sanitize(responce),
      ticketstatus: sanitize(ticketstatus),
    });

    await task.save();
    return res.status(201).json({ task });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};

// Get single task
const getSingleTask = async (req, res) => {
  const id = sanitize(req.params.id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not Found" });
  }
  try {
    const singleTask = await Task.findById(id);
    if (!singleTask) {
      return res.status(404).json({ error: "Task not Found" });
    }
    res.status(200).json(singleTask);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  const id = sanitize(req.params.id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not Found" });
  }

  try {
    const safeBody = sanitize(req.body);
    const task = await Task.findByIdAndUpdate(
      { _id: id },
      { ...safeBody },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not Found" });
    }

    res.status(200).json(task);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const id = sanitize(req.params.id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not Found" });
  }

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task not Found" });
    }
    res.status(200).json(task);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};
module.exports = {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
