const User = require("../models/user");
const ReturnData = require("../returnStructure");

const returnError = (error) => {
	const returnData = new ReturnData();
	returnData.hasError = true;
	returnData.error.push(error);
	return returnData.toJSON();
};

const returnSuccess = (data) => {
	const returnData = new ReturnData();
	returnData.addData((key = "data"), (value = data));
	return returnData.toJSON();
};

// BanUser
const banUser = async (req, res) => {
	try {
        const user = await User.findOne({ _id: req.banUserId });
        user.banned = true;
        return res.status(200).json(returnSuccess({ "user": user, "message" : "User banned successfully"}));
	} catch (err) {
		console.error(err);
		return res.status(500).json(returnError(err.message));
	}
};

// unflagwallet
const unflagWallet = async (req, res) => {
	try {
		const user = await User.findOne({
			"walletids.wallets.walletAddress": walletAddress,
		});

		user.flagged = false;
		await user.save()
        return res.status(200).json(returnSuccess("User Reported Successfully"));
	} catch (err) {
		console.error(err);
		return res.status(500).json(returnError(err.message));
	}
}
module.exports = { banUser, unflagWallet };
