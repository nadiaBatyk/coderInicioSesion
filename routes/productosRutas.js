const Router = require("express");
const router = Router();

//cuando le pegan al endpoint / render index.hbs
router.get("/", (req, res) => {
  if (req.session.nombre) {
    res.render("layouts\\index", {
      layout: "index",
      nombre: req.session.nombre,
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
