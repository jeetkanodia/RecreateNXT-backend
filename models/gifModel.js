const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gifSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    tips: {
      type: [],
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Gif", gifSchema);
// varun gandu
