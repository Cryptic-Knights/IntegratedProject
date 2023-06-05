const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.requiresAuth = async (req, res, next) => {
	const token = req.headers.authorization;
	console.log(token);

	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(userId);
		req.user = user;
		console.log(jwt.verify(token, process.env.JWT_SECRET));
	} catch (err) {
		console.log(err);
	}
	next();
};
exports.requiresAdmin = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		if (token) {
			const { userId } = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById(userId);
			if (!user.isAdmin) {
				throw new Error("Unauthorized access");
			}
			req.user = user; // Assign user to req.user for further access
			next();
		} else {
			return res.status(401).send("Unauthorized");
		}
	} catch (err) {
		console.error(err);
		return res.status(401).json({ error: "Unauthorized" });
	}
};

