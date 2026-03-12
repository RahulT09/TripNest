if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const listing = require("../models/listing.js");
const { isLoggedIn, isOwner, ListingValidate } = require("../middleware.js");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const listingControl = require("../controllers/listing.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
dayjs.extend(relativeTime);

router
  .route("/")
  .get(wrapAsync(listingControl.index))
  .post(
    isLoggedIn,
    ListingValidate,
    upload.single("listing[image]"),
    wrapAsync(listingControl.newlistLogic),
  );

//new listing
router.get("/add", isLoggedIn, listingControl.renderNewListForm);

//edit listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControl.editForm),
);

router
  .route("/:id")
  .put(ListingValidate, isOwner,upload.single("listing[image]"), wrapAsync(listingControl.editFormLogic))
  .delete(isLoggedIn, isOwner, wrapAsync(listingControl.deleteList))
  .get(wrapAsync(listingControl.listingDetail));

module.exports = router;
