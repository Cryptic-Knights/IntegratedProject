const {Schema, model} = require("mongoose");

const Coins = new Schema(
    {
        coinId: {
            type: String,
            required: true,
        },
        coinName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Coin = model("Coin", Coins);
module.exports = Coin;