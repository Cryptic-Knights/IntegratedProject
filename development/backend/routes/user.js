const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/permissions");
const { getUserinfo, getQr } = require("../controllers/user");


//  @route      GET /user/test
//  @Desc       Testing Route for /transaction
//  @Access     Public
router.get("/test", (req, res) => {
    res.status(200).send("/user is discoverable");
});


// @route       GET /user/info
// @Desc        Async route to transfer crypto
// @Access      Private
router.get("/info", requiresAuth, getUserinfo);


// @route       GET /user/getqr
// @Desc        Async route to get user's qr string
// @Access      Private
router.get("/getqr", requiresAuth, getQr);

module.exports = router;