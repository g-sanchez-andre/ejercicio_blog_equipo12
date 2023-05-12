const passport = require("passport");

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: req.session.redirectTo ? req.session.redirectTo : "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res);
}
function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/users/login");
  });
}
module.exports = {
  login,
  logout,
};
