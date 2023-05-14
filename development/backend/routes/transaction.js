const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/permissions");
const { send, history, getQr } = require("../controllers/transaction");
const verifyWallet = require("../middleware/verifywallet");


//  @route      GET /transaction/test
//  @Desc       Testing Route for /transaction
//  @Access     Public
router.get("/test", (req, res) => {
    res.send("Works").status(200);
});


// @route       POST /transaction/send
// @Desc        Async route to transfer crypto
// @Access      Private
router.post("/send", requiresAuth, send);


// @route       GET /transaction/history
// @Desc        Async route to get the transaction history of the user
// @Access      Private
router.get("/history", requiresAuth, history);


// @route       GET /transaction/send
// @Desc        Async route to get user's qr string
// @Access      Private
router.get("/getqr", requiresAuth, getQr);



// // @route       POST /transaction/rollback
// // @Desc        Async route to transfer crypto
// // @Access      Private
// router.post("/send", requiresAuth, async (req, res) => {
//     try {
//         send;
//     }
//     catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// })

module.exports = router;