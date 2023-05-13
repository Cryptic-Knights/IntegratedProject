const validateWallet = require("../validators/walletVerification");
const ReturnData = require("../returnStructure");


const verifyWallet = async (req, res, next) => {
    const returnData = new ReturnData();
    const { isValid, errors }  = validateWallet(req.body);

    if (isValid) {
        return next();
    } else {
        returnData.hasError = true;
        returnData.error.push(errors);
        return res.status(400).json(returnData.toJSON());
    }
}

module.exports = verifyWallet;