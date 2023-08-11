const User = require("../models/user");
const jwt = require("jsonwebtoken");

const setReviever = async (req, res, next) => {
    setTimeout(next, 5000);
};

module.exports = { setReviever };