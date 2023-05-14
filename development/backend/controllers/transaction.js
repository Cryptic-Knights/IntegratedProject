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
	const senderWallet = req.body.walletId;
	const amount = req.body.amount;
	const recieverWallet = req.body.recieverWallet;
	const coinData = req.coinData;
	const walletInfo = user.walletids.wallets.map((wallet) => {
		if (wallet.walletAddress === walletAddress) {
			return {
				walletType: wallet.walletType,
				networkType: wallet.networkType,
				walletHoldings: wallet.walletHoldings,
			};
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
		const transaction = new Transaction({
			sender: {
				userId: user._id,
				walletId: senderWallet,
			},
			recipient: {
				userId: reciever._id,
				walletId: recieverWallet,
			},
			coinId: coinData.coinId,
			coinName: coinData.coinName,
            amount: amount,
            status: 'Pending',
		});
		// Update the sender's wallet balance
		senderWallet.walletHoldings -= amount;
		await user.save();

		// Update the recipient's wallet balance
		reciever.walletHoldings += amount;
		await reciever.save();

		// Save the transaction to the database
        await transaction.save();
        transaction.status = 'Completed';
        await transaction.save();
        
        res.status(200).json(returnSuccess({ "status": Completed, "transaction": transaction }));
	} catch (err) {
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
		// Iterate through each wallet in the user's `walletids` array
		const transactionPromises = user.walletids.map(async (wallet) => {
			const transactions = await Transaction.find({
				"from.walletid": wallet.walletid,
			}).sort({ createdAt: -1 });
			return transactions;
		});

		// Wait for all promises to resolve and flatten the results into a single array
		const transactions = await Promise.all(transactionPromises);
		res.status(200).json(returnSuccess(transactions.flat()));
	} catch (err) {
		res.send(500).json(returnError(err.message));
	}
};

// getQr for the user id

module.exports = { send, history, getQr };
