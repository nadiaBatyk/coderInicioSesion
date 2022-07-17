const Router = require("express");
const router = Router();

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("login");
  }
}
//cuando le pegan al endpoint / render index.hbs
router.get("/", isAuth, (req, res) => {
  res.render("layouts\\index", {
    layout: "index",
    nombre: req.user.email,
  });
});

module.exports = router;
