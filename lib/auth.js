module.exports = {
  isOwner: function (req, res) {
    if (req.user) {
      return true;
    } else {
      return false;
    }
  },
  statusUI: function (req, res) {
    var a = req.session.login_id;
    if (this.isOwner(req, res)) {
      a = req.session.login_id;
    }
    return a;
  },
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login/fail");
  },
};
