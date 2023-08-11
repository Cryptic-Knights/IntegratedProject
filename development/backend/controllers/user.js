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

// Registers a user
exports.getUserinfo = async (req, res) => {
	try {
		const newUser = new User({
			email: req.user.email,
			name: req.user.name,
			age: req.user.age,
			walletids: req.user.walletids,
			verified: req.user.verified,
			flagged: req.user.flagged,
			banned: req.user.banned,
		});
		
		return res.status(200).json(returnSuccess(newUser));
	} catch (err) {
		res.status(500).json(returnError(err.message));
	}
};

// getQr for the user id
exports.getQr = async (req, res) => {
	res.status(200).send("The Qr route is yet to be setup");
}

