function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirecTo = req.session.redirecTo;
    res.redirect("/user/login");
  }
}

module.exports = ensureAuthenticated;
