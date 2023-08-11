const crypto = require("crypto");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validators/registerValidatation");
const ReturnData = require("../returnStructure");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			// api_key: Api key goes here..
		},
	})
);

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
exports.signUp = async (req, res) => {
	try {
		const { errors, isValid } = validateRegisterInput(req.body);

		if (!isValid) {
			return res.status(400).json(returnError(errors));
		}

		const exsistingEmail = await User.findOne({
			email: new RegExp("^" + req.body.email + "$", "i"),
		});

		if (exsistingEmail) {
			return res.status(400).json(returnError({ "email": "Email already exsists" }));
		}

		const hashedpassword = await bcrypt.hash(req.body.password, 12);

		const newUser = new User({
			email: req.body.email,
			name: req.body.name,
			password: hashedpassword,
			age: req.body.age,
			verified: false,
			flagged: false,
			banned: false,
		});

		const savedUser = await newUser.save();

		const updatedSavedUser = { ...savedUser._doc }; // Spread the previous object as it is immutable so we create a new one
		delete updatedSavedUser.password; // Remove the plain text password from the return user

		return res.status(200).json(returnSuccess(updatedSavedUser));
	} catch (err) {
		res.status(500).json(returnError(err.message));
	}
};

//  Logs in a user
exports.logIn = async (req, res, next) => {
	try {
		// check for username in the database
		const user = await User.findOne({
			email: new RegExp("^" + req.body.email + "$", "i"),
		});
		// If user could not be found
		if (!user) {
			return res.status(400).json(returnError("There is an error with the login credentials"));
		}

		// check the password if the user exsists
		if (!req.body.password) {
			return res.status(400).json(returnError("There is an error with the login credentials"));
		}
		const passwordMatch = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!passwordMatch) {
			return res.status(400).json(returnError("There is an error with the login credentials"));
		}

		const payload = { userId: user._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "2d",
		});

		// Remove the plain text password from the user data to be returned
		const userToReturn = { ...user._doc };
		delete userToReturn.password;

		data = { token: token, user: userToReturn, };
		console.log("Login success");
		return res.status(200).json(returnSuccess(data));

	} catch (err) {

		console.log(err);
		return res.status(500).json(returnError(err.message));

	}
};

// Password Reset
exports.passwordReset = (req, res, next) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) res.status(402).send({ message: "something went wrong" });
		const token = buffer.toString("hex");
		console.log(req.body.email);
		User.findOne({ email: req.body.email })
			.then((user) => {
				if (!user) {
					res.status(404).send({ message: "aww sorry, user not found!" });
				}
				user.resetToken = token;
				user.resetTokenExpiration = Date.now() + 3600000;
				console.log(user.resetTokenExpiration);
				return user.save();
			})
			.then((result) => {
				res.status(200).send({
					message: "Password reset link sent successfully",
				});
				transporter.sendMail({
					to: req.body.email,
					from: "javascripters@gmail.com",
					subject: "Password Reset",
					html: `<p>You requested a password reset</p>
                <p>Please click this <a href="/https://localhost:3000/reset/${token}">link</a> to set a new password</p>
          `,
				});
			})
			.catch((err) => console.log(err));
	});
};

// Updating the reset password
exports.updatePassword = async (req, res, next) => {
	const updatedPassword = req.body.password;
	const userId = req.body.user_id;
	const token = req.params.token;
	try {
		const user = await User.findOne({
			resetToken: token,
			resetTokenExpiration: { $gt: Date.now() },
			_id: userId,
		});
		if (!user) {
			res.status(401).send({
				message: "Invalid user credentials. Please review and retry",
			});
			return;
		}
		const hashedPassword = await bcrypt.hash(updatedPassword, 12);
		user.password = hashedPassword;
		user.resetToken = undefined;
		user.resetTokenExpiration = undefined;
		await user.save();
		res.send({
			message: "Password successfully updated!",
		});
	} catch (err) {
		console.log(err);
	}
};
