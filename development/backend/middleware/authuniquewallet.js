const User = require("../models/user");
const ReturnData = require("../returnStructure");

const checkDuplicateWalletId  = async (req, res, next) => {
	const returnData = new ReturnData();
	try {
		const user = req.user;
		const walletId = req.body.walletId;

		// Check if the wallet already belongs to the user
		user.walletids.wallets.map((wallet, index) => {
			if (wallet.walletAddress == walletId) {
				returnData.hasError = true;
				returnData.error.push("Wallet already belongs to you");
				return res.status(400).json(returnData.toJSON());
			}
		});

		// Check if the wallet is already present in the database
		const userOther = await User.findOne({ 'walletids.wallets.walletAddress': walletId });
			if (userOther) {
                returnData.hasError = true;
                returnData.error.push("Wallet Address already exsists in database");
                return res.status(400).json(returnData.toJSON());
			} else {
                next();
			}
		}catch (error) {
        console.error(error);
        returnData.hasError = true;
        returnData.error.push(error.message);
        return res.status(500).json(returnData.toJSON());
	}
};

module.exports = checkDuplicateWalletId ;
