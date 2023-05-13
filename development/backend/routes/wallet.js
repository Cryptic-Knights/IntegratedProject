const User = require("../models/user");
const router = require("express").Router();
// Controllers
const { addWallet } = require("../controllers/wallet");

// Middleware
const requiresAuth = require("../middleware/permissions");
const verifyWallet = require("../middleware/verifywallet");
const checkDefault = require("../middleware/checkdefault");
const checkDuplicateWalletId = require("../middleware/authuniquewallet");

//  @route      POST /wallet/test
//  @Desc       Testing Route for /wallet
//  @Access     Public
router.get("/test", (req, res) => {
    res.status(200).send("/wallet routes are discoverable");
});

//  @route      POST /wallet/add
//  @Desc       Add's a wallet to the users list of wallets
//  @Access     Private
router.post("/add", requiresAuth, verifyWallet, checkDuplicateWalletId, addWallet);

module.exports = router;