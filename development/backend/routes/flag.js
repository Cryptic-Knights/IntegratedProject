const router = require("express").Router();
const requiresAuth = require("../middleware/permissions");
const { flagWallet } = require("../controllers/wallet");

//  @route      POST /flag/test
//  @Desc       Testing Route for /flag
//  @Access     Public
router.get("/test", (req, res) => {
    res.status(200).send("/flag routes are discoverable");
});

//  @route      POST /flag/wallet
//  @Desc       Route to flag an user as suspicous
//  @Access     Private
router.post("/wallet", requiresAuth, flagWallet);


module.exports = router;