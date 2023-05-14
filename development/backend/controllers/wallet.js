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

// addWallet to database
const addWallet = async (req, res) => {
	const user = req.user;
	try {
		if (!user.walletids.defaultwallet) {
			// If there is no default wallet set then set the current as one
			user.walletids.defaultwallet = req.body.walletId;
		}
		// Add wallet to the list of wallets
		user.walletids.wallets.push({
			walletAddress: req.body.walletId,
			walletType: req.body.coinType,
			networkType: req.body.networkType,
			// fetch balance somehow and add here
		});

		await user.save();
		return res.status(200).json(returnSuccess("Wallet added successfully"));
	} catch (err) {
		return res.status(500).json(returnError(err.message));
	}
};
// removeWallet
const removeWallet = async (req, res) => {
	const user = req.user;
	const walletId = req.body.walletId;
	try {
		user.walletids.wallets = user.walletids.wallets.filter(
			(wallet) => wallet.walletAddress !== walletId
		);

		await user.save();
		return res.status(200).json(returnSuccess("Wallet removed successfully"));
	} catch (err) {
		return res.status(500).json(returnError(err.message));
	}
};
// fetchwalletinfo
const fetchWalletinfo = async (req, res) => {
	try {
		const user = await User.findOne({
			"walletids.wallets.walletAddress": req.body.walletId,
		}).select("name age walletids.wallets.$");
        return res.status(200).json(returnSuccess(user));
	} catch (err) {
		console.error(err);
		return res.status(500).json(returnError(err.message));
	}
};
// changeDefault wallet
const changeDefault = async (req, res) => {
    const user = req.user;
    const walletId = req.body.walletId;
	try {
		if (user.walletids.defaultwallet == walletId) {
			return res.status(400).json(returnError("Already the default account"));
		}
        user.walletids.defaultwallet = walletId;
        await user.save();
        return res.status(200).json(returnSuccess("Default wallet changed successfully"));
    } catch (err) {
        console.error(err);
		return res.status(500).json(returnError(err.message));
    }
}
// flagwallet
const flagWallet = async (req, res) => {
	try {
		const user = await User.findOne({
			"walletids.wallets.walletAddress": req.body.walletId,
		});
		user.flagged = true;
		await user.save()
        return res.status(200).json(returnSuccess("User Reported Successfully"));
	} catch (err) {
		console.error(err);
		return res.status(500).json(returnError(err.message));
	}
}
module.exports = { addWallet, removeWallet, fetchWalletinfo, changeDefault, flagWallet };
