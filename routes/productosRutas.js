const Router = require("express");
const router = Router();



//cuando le pegan al endpoint / render FORM.hbs
router.get("/", (req, res) => {
  res.render("layouts\\index");
});

module.exports = router;
