const User = require("../models/user");
const jwt = require("jsonwebtoken");


const requiresAuth = async (req, res, next) => {
    const token = req.cookies["access-token"];
    let isAuthed = false;

    if (token){
        try{
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            try{
                const user = await User.findById(userId);

                if(user){
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

    if (isAuthed){
        return next();
    }else{
        res.status(401).send("UnAuthorised");
    }
}

module.exports = requiresAuth;