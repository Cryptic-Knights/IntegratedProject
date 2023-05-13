const { Schema, model } = require("mongoose");

const wallet = new Schema({
	walletAddress: {
		type: Schema.Types.String,
	},

	walletType: {
		// Type of the coin that the wallet holds
		type: Schema.Types.String,
	},

	networkType: {
		// Network type that the wallet operates in
		type: Schema.Types.String,
    },
    walletHoldings: {
        // Number of coins that the wallet holds
        type: Schema.Types.Decimal128,
    }
});

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},

		name: {
			type: String,
			required: true,
		},

		age: {
			type: Number,
			required: true,
			min: [18, "You must be at least 18 years old"],
			max: [120, "Age must not exceed 120 years"],
		},

		walletids: {
			defaultwallet: {
				type: String,
				default: () => null,
			},
			wallets: {
				type: [wallet],
				default: [],
			},
		},

		verified: {
			type: Boolean,
			required: true,
		},

		flagged: {
			type: Boolean,
			required: true,
		},

		banned: {
			type: Boolean,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", UserSchema);
module.exports = User;
