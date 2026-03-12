const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, ReviewValidate } = require("../middleware.js");
const reviewControl = require("../controllers/review.js");

//review route
router.post(
  "/",
  isLoggedIn,
  ReviewValidate,
  wrapAsync(reviewControl.reviewLogic),
);

//review delete route
router.delete("/:reviewId", isLoggedIn, wrapAsync(reviewControl.deleteReview));

module.exports = router;
