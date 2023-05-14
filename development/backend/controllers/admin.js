const Transaction = require("../models/transactions");
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
        const user = await User.findOne({ _id: req.body.userId });
		user.banned = true;
		user.flagged = false;
		await user.save()
        return res.status(200).json(returnSuccess({ "user": user, "message" : "User banned successfully"}));
	} catch (err) {
		console.error(err);
		return res.status(500).json(returnError(err.message));
	}
};

// unbanUser
const unbanUser = async (req, res) => {
	try {
        const user = await User.findOne({ _id: req.body.userId });
		user.banned = false;
		await user.save()
        return res.status(200).json(returnSuccess({ "user": user, "message" : "User unbanned successfully"}));
	} catch (err) {
		console.error(err);
		return res.status(500).json(returnError(err.message));
	}
};

// unflagwallet
const unflagWallet = async (req, res) => {
	try {
		const user = await User.findOne({
			"walletids.wallets.walletAddress": req.body.walletId,
		});

		user.flagged = false;
		await user.save()
        return res.status(200).json(returnSuccess("User Reported Successfully"));
	} catch (err) {
		console.error(err);
		return res.status(500).json(returnError(err.message));
	}
}

// get all transaction history
const allHistory = async (req, res) => {
	try {
		limit = req.body.limit;
		const transactions = await Transaction.find().sort({ createdAt: -1 }).limit(limit);
		return res.status(200).json(returnSuccess(transactions));
	} catch (err) {
		console.error(err);
		return res.status(500).json(returnError(err.message));
	}
};

// get all transaction history
const allFlagged = async (req, res) => {
	try {
		limit = req.body.limit;
		const users = await User.find({ flagged: true }).sort({ createdAt: 1 }).limit(limit);
		return res.status(200).json(returnSuccess(users));
	} catch (err) {
		console.error(err);
		return res.status(500).json(returnError(err.message));
	}
};

// get all transaction history
const allBanned = async (req, res) => {
	try {
		limit = req.body.limit;
		const users = await User.find({ banned: true }).sort({ createdAt: -1 }).limit(limit);
		return res.status(200).json(returnSuccess(users));
	} catch (err) {
		console.error(err);
		return res.status(500).json(returnError(err.message));
	}
};

module.exports = { banUser, unflagWallet, allHistory, allFlagged, allBanned, unbanUser };
