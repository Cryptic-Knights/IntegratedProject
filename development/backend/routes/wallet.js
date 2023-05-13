const User = require("../models/user");
const router = require("express").Router();
const requiresAuth = require("../middleware/permissions");

//  @route      POST /wallet/test
//  @Desc       Testing Route for /wallet
//  @Access     Public
router.get("/test", (req, res) => {
    res.status(200).send("/wallet routes are discoverable");
});

//  @route      POST /wallet/add
//  @Desc       Add's a wallet to the users list of wallets
//  @Access     Private
router.post("/add", verifywallet, checkDefault, addWallet);