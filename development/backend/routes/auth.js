const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controllers/auth");
const {requiresAuth} = require("../middleware/permissions");

//  @route      POST /auth/test
//  @Desc       Testing Route
//  @Access     Public
router.get("/test", (req, res) => {
    res.status(200).send("/auth routes work");
});

//  @route      POST /auth/register
//  @Desc       Register new user to the databse.
//              Data to be provided in the request
//              email           -> Required, Unique
//              name            -> Required
//              age             -> Required, 18 >=
//              password        -> Required
//              confirmpassword -> Required
//  @Access      Public
router.post("/register", signUp);

//  @route      POST /auth/login
//  Desc        Validate the login details from the database and setup a validation token
//              Data to be provided in the request
//              email           -> Required
//              password        -> Required
//  Access      Public
router.post("/login", logIn);

//  @route      POST /auth/current
//  Desc        Test Route to test user authorization
//  Access      Private
router.get("/current", requiresAuth, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ authority: "Unauthorized" });
    }
    return res.status(200).json({ User: req.user });
});


module.exports = router;