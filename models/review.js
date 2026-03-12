const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
  comment: String,
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now() },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},{ timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
