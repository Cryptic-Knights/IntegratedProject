const User = require("../models/user");
const ReturnData = require("../returnStructure");


const returnError = (error) => {
	const returnData = new ReturnData();
	returnData.hasError = true;
	returnData.error.push(error);
	return returnData.toJSON();
}

const returnSuccess = (data) => {
	const returnData = new ReturnData();
	returnData.addData(key = 'data', value = data);
	return returnData.toJSON();
}

// addWallet to database
const addWallet = async (req, res) => {
    const user = req.user;
    try {
        if (!(user.walletIds.defaultwallet)) {
            // If there is no default wallet set then set the current as one
            user.walletIds.defaultwallet = req.body.walletId;
        }
        // Add wallet to the list of wallets
        user.walletIds.wallets.push({
            walletAddress: req.body.walletId,
            walletType: req.body.coinType,
            networkType: req.body.networkType
        })

        await user.save();
        return res.status(200).json(returnSuccess("Wallet added successfully"));

    } catch (err) {
        return res.status(500).json(returnError(err.message));
    }
}
// removeWallet
// verifyWallet
// fetchwalletinfo

module.exports = { addWallet };