const User = require("../models/user.js");
const { userSchema } = require("../schema.js");


module.exports.signUpForm = (req, res) => {
  res.render("user/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err, next) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome To TripNest!!");
      res.redirect("/listing");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "welcome to TripNest!! You are logged-in");
  let redirecturl = res.locals.savedurl || "/listing";
  res.redirect(redirecturl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "you are logged out");
      res.redirect("/listing");
    }
  });
};
