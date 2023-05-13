const User = require("../models/user");

const checkDefault = async (req, res, next) => {
    const token = req.cookies["access-token"];
    try {
        if (token) {
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(userId);
            console.log(user);
            req.body.defaultWallet = user.walletids.defaultwallet
            next();
        }
        else {
            req.body.defaultWallet = null;
        }
    } catch (err) {
        req.body.user = null;
        next();
    }
}

module.exports = checkDefault;