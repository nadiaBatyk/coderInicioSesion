const Router = require("express");
const router = Router();



//cuando le pegan al endpoint de test / render index.hbs
router.get("/", (req, res) => {
    const arr = [];
    for (let index = 0; index < 5; index++) {
        arr.push()
        
    }
  res.render("layouts\\test",{mensaje:'holaaa', layout:'test'});
 // res.json({mensaje:'hola'})
});

module.exports = router;
