const listing = require("./models/listing.js");
const Review = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log(req.originalUrl);
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must login first");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.savedurl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listingData = await listing.findById(id);
  if (!listingData.owner.equals(res.locals.user._id)) {
    req.flash("error", "You dont have permission to modify");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

module.exports.ListingValidate = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.userValidate = (req, res, next) => {
  let { error } = userSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.ReviewValidate = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isRevAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;

  const reviews = await Review.findById(reviewId);

  if (!reviews) {
    req.flash("error", "Review not found");
    return res.redirect(`/listing/${id}`);
  }

  if (!reviews.author.equals(req.user._id)) {
    req.flash("error", "You don’t have permission to delete");
    return res.redirect(`/listing/${id}`);
  }

  next();
};
