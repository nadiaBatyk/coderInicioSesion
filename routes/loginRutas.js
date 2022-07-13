const Router = require("express");
const router = Router();

//cuando le pegan al endpoint / render index.hbs
router.get("/", (req, res) => {
  res.render("layouts\\login", { layout: "login" });
});
router.post("/login", (req, res) => {
  console.log(req.sessionID);
  req.session.nombre = req.body.nombre;
  res.render("layouts\\index", { layout: "index", nombre: req.session.nombre });
});

router.get("/logout", (req, res) => {
  let nombre = req.session.nombre;

  res.render("layouts\\logout", {
    layout: "logout",
    nombre: req.session.nombre,
  });
  req.session.destroy();
});

module.exports = router;
