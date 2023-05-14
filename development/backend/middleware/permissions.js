const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.requiresAuth = async (req, res, next) => {
	const token = req.cookies["access-token"];
	let isAuthed = false;

	if (token) {
		try {
			const { userId } = jwt.verify(token, process.env.JWT_SECRET);
			try {
				const user = await User.findById(userId);

				if (user) {
					req.user = user;
					isAuthed = true;
				}
			} catch {
				isAuthed = false;
			}
		} catch {
			isAuthed = false;
		}
	}

	if (isAuthed) {
		return next();
	} else {
		res.status(401).send("UnAuthorised");
	}
};

exports.requiresAdmin = async (req, res, next) => {
	try {
		const token = req.cookies["access-token"];

		if (token) {
			const { userId } = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById(userId);
			if (!user.isAdmin) {
				throw new Error("Unauthorized access");
			}
			next();
        }
        else {
            res.status(401).send("UnAuthorised")
        }
	} catch (err) {
		console.error(err);
		res.status(401).json({ error: "Unauthorised" });
	}
};