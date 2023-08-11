const WAValidator = require('@swyftx/api-crypto-address-validator')
const isEmpty = require("./isEmpty");

const validateWallet = (data) => {
    let errors = {};
    // Check if the coin type exsists in request
    if (isEmpty(data.coinType)) {
        errors.coinType = "Provide a valid coin type associated with the wallet";
        return {
            errors,
            isValid: isEmpty(errors),
        };
    }

    // Check if the networktype exsists else make it testnet
    if (isEmpty(data.networkType)) {
        data.networkType = "testnet";
    }

    //  Check if wallet id exsists in request and check if the address is valid if it exsists
    if (isEmpty(data.walletId) || WAValidator.validate(data.walletId, data.coinType, data.networkType)) {
        errors.walletId = "Provide a valid wallet id";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = validateWallet;