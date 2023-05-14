const router = require("express").Router();
const requiresAdmin = require("../middleware/permissions");
const { banUser, unflagWallet, allHistory, unbanUser, allBanned, allFlagged } = require("../controllers/admin");
//  @route      POST /flag/test
//  @Desc       Testing Route for /flag
//  @Access     Public
router.get("/test", (req, res) => {
    res.status(200).send("/flag routes are discoverable");
});

//  @route      POST /admin/ban
//  @Desc       Route to ban user
//  @Access     Private
router.post("/ban", requiresAdmin, banUser);

//  @route      GET /admin/unban
//  @Desc       Route to unban user
//  @Access     Private
router.get("/unban", requiresAdmin, unbanUser);

//  @route      POST /admin/unflag
//  @Desc       Route to remove flag from a flagged user
//  @Access     Private
router.post("/unflag", requiresAdmin, unflagWallet);

//  @route      POST /admin/viewflagged
//  @Desc       Route to view all the flagged users
//  @Access     Private
router.post("/viewflag", requiresAdmin, allFlagged);

//  @route      POST /admin/unflag
//  @Desc       Route to remove flag from a flagged user
//  @Access     Private
router.post("/viewban ", requiresAdmin, allBanned);

//  @route      GET /admin/allhistory
//  @Desc       Fetches history of all transactions
//  @Access     Private
router.get("/allhistory", requiresAdmin, allHistory);


module.exports = router;