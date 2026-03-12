const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { Schema } = mongoose;
const Review = require("./review.js");

let listingSchema = new schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      filename: {
        type: String,
      },
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&auto=format&fit=crop&q=60",
      },
    },
    price: Number,
    location: String,
    geometry: {
      type: {
        type: String,
        enum: ["Point"], // must be "Point"
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: Review,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

let listing = mongoose.model("listing", listingSchema);

module.exports = listing;
