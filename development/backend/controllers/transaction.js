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

const send = async (req, res, next) => {
	const user = req.user;
	const senderWallet = req.body.senderWallet;
	const amount = req.body.amount;
	const recieverWallet = req.body.recieverWallet;
	const coinId = req.body.coinId;
	const coinName = req.body.coinName;
	const walletInfo = await user.walletids.wallets.map((wallet) => {
		if (wallet.walletAddress == senderWallet) {
			return wallet;
		}
	});

	// Check if the reciever exsists in the database
	// If it exsists then update data accordingly else just complete the payment
	const reciever = await User.findOne({
		"walletids.wallets.walletAddress": recieverWallet,
	});

	try {
		if (!reciever) {
			return res
				.status(400)
				.json(
					returnError("This reciever isn't registered on our platform")
				);
		}
		// If the select wallet dosent have the sufficient balance then returnError
		if (amount > walletInfo.walletHoldings) {
			return res
				.status(400)
				.json(
					returnError(
						"This wallet doesn't have the required balance to make this payment"
					)
				);
		}

		// Create the transaction object
		console.log(req.body);
		const transaction = new Transaction({
			from: {
				walletId: senderWallet,
			},
			to: {
				walletId: recieverWallet,
			},
			item: {
				coinId: coinId,
				coinName: coinName,
				coinQuantity: amount,
				coinValue: 1000.09,
			},
			status: "Completed",
		});

		// Update the sender's wallet balance
		user.walletids.wallets.map((wallet) => {
			if (wallet.walletAddress == walletInfo.walletAddress) {
				wallet.walletHoldings -= amount;
			}
		});
		await user.save();

		// Update the recipient's wallet balance
		reciever.walletHoldings += amount;
		await reciever.save();

		// Save the transaction to the database
		console.log(transaction);
		await transaction.save();
		// transaction.status = 'Completed';
		// await transaction.save();

		res.status(200).json(
			returnSuccess({ status: "Completed", transaction: transaction })
		);
	} catch (err) {
		console.log(err);
		res.status(500).json(
			returnError({
				error: `Transaction could not be complete due to ${err.message}`,
			})
		);
	}
};
// Get history of user transaction
const history = async (req, res, next) => {
	const user = req.user;
	try {
		const walletIds = user.walletids.wallets.map((wallet) => {
			console.log(wallet);
			return wallet.walletAddress;
		});

		const transactions = await Transaction.find({
			$or: [
				{ "from.walletId": { $in: walletIds } },
				{ "to.walletId": { $in: walletIds } },
			],
		})
			.sort({ createdAt: -1 })
			.exec();

		res.status(200).json(returnSuccess(transactions));
	} catch (err) {
		res.status(500).json(returnError(err.message));
	}
};

// getQr for the user id
const getQr = async (req, res) => {
	res.status(200).send("The Qr route is yet to be setup");
};

module.exports = { send, history, getQr };
