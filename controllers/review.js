const listing = require("../models/listing.js");
const Review = require("../models/review.js");



module.exports.reviewLogic = async (req, res) => {
  let listings = await listing.findById(req.params.id).populate("reviews");;
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  await newReview.save();
  listings.reviews.push(newReview._id);
  await listings.save();
  req.flash("success", "Review Added");
  res.redirect(`/listing/${listings._id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  let dlt = await Review.findByIdAndDelete(reviewId);
  req.flash("error", "Review Deleted");
  res.redirect(`/listing/${id}`);
};
