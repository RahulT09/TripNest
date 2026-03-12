const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const { userSchema } = require("../schema.js");
const passport = require("passport");
const { saveRedirectUrl, userValidate } = require("../middleware.js");
const userControl = require("../controllers/user.js");

router
  .route("/signup")
  .get(userControl.signUpForm)
  .post(wrapAsync(userControl.signup));

router
  .route("/login")
  .get(userControl.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControl.login,
  );

router.get("/logout", userControl.logout);

module.exports = router;
