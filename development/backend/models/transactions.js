const { Schema, model } = require("mongoose");

const transactionUserData = new Schema({
    walletid: {
        type: Schema.Types.String,
        required: true,
    }
});

const transactionItem = new Schema({
    coinId: {
        type: Schema.Types.String,
        required: true,
    },
    coinName: {
        type: Schema.Types.String,
        required: true,
    },
    coinQuantity: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    coinValue: {
        type: Schema.Types.Decimal128,
        required: true,
    }
});

const transactionSchema = new Schema(
    {
        transactionId: {
            type: Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId,
        },
        from: transactionUserData,
        to: transactionUserData,
        item: {
            transactionItem
        },
        status: {
            type: Schema.Types.String,
            enum: ['Active', 'Completed', 'Terminated'],
            required: true,
        }
	},
	{
		timestamps: true,
	}
);
const Transaction = model("Transaction", transactionSchema);
module.exports = Transaction;