const User = require("../models/user");
const router = require("express").Router();
// Controllers
const { addWallet, removeWallet, fetchWalletinfo, changeDefault } = require("../controllers/wallet");

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
router.post("/add", requiresAuth, verifyWallet, checkDuplicateWalletId, addWallet); // Need to update this to fetch and set holdings of a wallet


//  @route      POST /wallet/remove
//  @Desc       Remove wallet the users list of wallets
//  @Access     Private
router.post("/remove", requiresAuth, removeWallet);

//  @route      GET /wallet/fetch
//  @Desc       Fetches all the info from our database relating to the wallet address provided 
//  @Access     Public
router.get("/fetch", verifyWallet, fetchWalletinfo);

//  @route      GET /wallet/change
//  @Desc       Change's the default wallet of the user
//  @Access     Private
router.get("/change", requiresAuth, changeDefault);

module.exports = router;