const passport = require("passport");

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: req.session.redirectTo ? req.session.redirectTo : "/",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res);
}

function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
  console.log("Logout successful");
}

module.exports = { login, logout };
