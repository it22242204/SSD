const sanitize = require("mongo-sanitize");
const Rating = require("../Model/RatingSystemModel");

// Get all ratings
const getAllRating = async (req, res, next) => {
  try {
    const rate = await Rating.find();
    if (!rate || rate.length === 0) {
      return res.status(404).json({ message: "Rating not found" });
    }
    return res.status(200).json({ rate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new rating
const addRating = async (req, res, next) => {
  const { imgurl, username, email, rating, date, comment } = sanitize(req.body);

  try {
    const rate = new Rating({
      imgurl,
      username,
      email,
      rating,
      date,
      comment,
    });
    await rate.save();
    return res.status(201).json({ rate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add Rating" });
  }
};

// Get rating by ID
const getById = async (req, res, next) => {
  const id = sanitize(req.params.id);

  try {
    const rate = await Rating.findById(id);
    if (!rate) {
      return res.status(404).json({ message: "Rating Not Found" });
    }
    return res.status(200).json({ rate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update rating
const updateRating = async (req, res, next) => {
  const id = sanitize(req.params.id);
  const { imgurl, username, email, rating, date, comment } = sanitize(req.body);

  try {
    let rates = await Rating.findByIdAndUpdate(
      id,
      { imgurl, username, email, rating, date, comment },
      { new: true }
    );

    if (!rates) {
      return res.status(404).json({ message: "Unable to Update Rating Details" });
    }
    return res.status(200).json({ rates });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete rating
const deleteRating = async (req, res, next) => {
  const id = sanitize(req.params.id);

  try {
    const rate = await Rating.findByIdAndDelete(id);
    if (!rate) {
      return res.status(404).json({ message: "Unable to Delete Rating Details" });
    }
    return res.status(200).json({ rate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllRating = getAllRating;
exports.addRating = addRating;
exports.getById = getById;
exports.updateRating = updateRating;
exports.deleteRating = deleteRating;
