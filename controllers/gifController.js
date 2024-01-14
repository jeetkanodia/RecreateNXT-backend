const Gif = require("../models/gifModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");
//get random gif
const getRandomGif = async (req, res) => {
  let gif;
  if (req.user.activeGif[0] === undefined) {
    gif = await Gif.aggregate([{ $sample: { size: 1 } }]);

    if (gif.length === 0)
      return res.status(404).json({ error: "No gifs found" });
    console.log("gif"); // update user's activeGif
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        activeGif: gif,
      }
    );
  } else {
    gif = req.user.activeGif;
  }
  res.status(200).json({ status: true, data: gif });
};

// submit gif
const submitGif = async (req, res) => {
  const { url, gif } = req.body;
  let emptyFields = [];
  if (!url) {
    emptyFields.push("URL");
  }
  if (!gif) {
    emptyFields.push("GIF");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  // add doc to db
  try {
    const user = await User.findOne({ _id: req.user._id });
    let obj = {
      ytUrl: url,
      gif: gif,
    };
    user.submittedGifs.push(obj);
    await user.save();

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all Gifs
const getGifs = async (req, res) => {
  const gifs = await Gif.find({});

  res.status(200).json({ status: true, data: gifs });
};

// get a single gif by id
const getGif = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }

  const gif = await Gif.findById(id);

  if (!gif) {
    return res.status(404).json({ error: "No such gif" });
  }

  res.status(200).json(gif);
};

// // create new gif
const createGif = async (req, res) => {
  const { url, tips } = req.body;

  let emptyFields = [];

  if (!url) {
    emptyFields.push("URL");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const gif = await Gif.create({
      url,
      tips,
    });
    res.status(200).json({ status: true, data: gif });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a gif
const deleteGif = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such gif" });
  }

  const gif = await Gif.findOneAndDelete({ _id: id });

  if (!gif) {
    return res.status(400).json({ error: "No such gif" });
  }

  res.status(200).json({ status: true, data: gif });
};

// update a blog
const updateGif = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such gif" });
  }

  const gif = await Gif.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!gif) {
    return res.status(400).json({ error: "No such gif" });
  }

  res.status(200).json(gif);
};

module.exports = {
  getRandomGif,
  getGifs,
  getGif,
  createGif,
  deleteGif,
  updateGif,
  submitGif,
};
//
