const listing = require("../models/listing.js");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const getCoordinates = require("../utils/geocode");
const { cloudinary } = require("../cloudConfig.js");
const fs = require("fs");

module.exports.index = async (req, res) => {
  let { category, search } = req.query;
  let query = {};

  if (category) {
    query.title = { $regex: category, $options: "i" };
  }

  if (search) {
    query.location = { $regex: search, $options: "i" };
  }

  let allData = await listing.find(query);

  if (category && allData.length === 0) {
    req.flash("error", "No listings found in this category!");
    return res.redirect("/listing");
  }

  if (search && allData.length === 0) {
    req.flash("error", "No listings found for this location!");
    return res.redirect("/listing");
  }

  res.render("./listings/index.ejs", { allData, category });
};

module.exports.renderNewListForm = (req, res) => {
  res.render("./listings/newisting.ejs");
};

module.exports.newlistLogic = async (req, res, next) => {
  if (!req.file) {
    req.flash("error", "Please upload an image");
    return res.redirect("/listing/new");
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "tripnest_DEV",
  });

  let url = result.secure_url;
  let file = result.public_id;
  fs.unlinkSync(req.file.path);

  let newList = req.body.listing;
  newList.owner = req.user._id;
  newList.image = { file, url };
  const coords = await getCoordinates(newList.location);
  if (!coords) {
    req.flash("error", "Location not found");
    return res.redirect("/listing/new");
  }

  newList.geometry = {
    type: "Point",
    coordinates: [coords.lng, coords.lat],
  };

  let list = new listing(newList);

  await list.save();

  req.flash("success", "New Listing Created");
  res.redirect(`/listing`);
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  let databyId = await listing.findById(id);
  if (!databyId) {
    req.flash("error", "Listing you are trying to access doesn't exist");
    return res.redirect("/listing");
  } else {
    let originalUrl = databyId.image.url;
    originalUrl = originalUrl.replace("/upload", "/updoad/h_300,w_250");
    res.render("./listings/edit.ejs", { databyId, originalUrl });
  }
};

module.exports.editFormLogic = async (req, res) => {
  let { id } = req.params;
  if (!req.body.listing) {
    throw new ExpressError(400, "please enter detail");
  }

  let data = req.body.listing;
  let listing1 = await listing.findByIdAndUpdate(id, {
    ...data,
  });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing1.image = { filename, url };
    await listing1.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listing/${id}`);
};

module.exports.deleteList = async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id);
  req.flash("error", "Listing Deleted");
  res.redirect("/listing");
};

module.exports.listingDetail = async (req, res) => {
  let { id } = req.params;
  let databyId = await listing
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!databyId) {
    req.flash("error", "Listing you are trying to access is not available");
    res.redirect("/listing");
  }
  let timeAgo = dayjs(databyId.createdAt).fromNow();

  res.render("./listings/detail.ejs", { databyId, timeAgo });
};

module.exports.showMap = async (req, res) => {
  const listings = await Listing.find({}); // fetch all listings
  res.render("listings/map", { listings }); // send array to EJS
};
