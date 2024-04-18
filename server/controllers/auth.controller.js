import User from "../models/User.model.js";
import { modelErrorHandler, ErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const registerUser = async (req, res, next) => {
    //make sure all data to send properly from frontend
    const {
        userName,
        firstName,
        lastName,
        emailId,
        password,
        isEmailVerified,
        profilePicLink
    } = req.body;
    try {
        const newUser = await User.create({
            userName,
            firstName,
            lastName,
            emailId,
            password,
            isEmailVerified,
            profilePicLink
        });

        const userToSend = await User.findById(newUser._id).select("-password");
        return res.status(201).json({ success: true, user: userToSend });
    } catch (err) {
        modelErrorHandler(err, next);
    }
};


//login handler
const loginUser = async (req, res, next) => {
    console.log('inside this')
    const field = req.body.field; //user can send either username or email 
    const password = req.body.password;
    const method = req.body.method;//which method user has chosen to login(sign in with usernamePassword=1,signInwithGoogle=2)

    if (method == "1") {
        let user = await User.findOne({
            $or:
                [
                    { userName: field },
                    { emailId: field }
                ]
        });

        console.log('here ', user)

        if (!user) return next( new ErrorHandler("Invalid Username or Password", 404));

        if ( user.password !== password ) return next(new ErrorHandler("Invalid Username or Password", 404));

        const token = jwt.sign({
                id: user._id,
                email: user.email,
            },
            process.env.JWTSECRET,
            {
                expiresIn: '168h'
            }
        );
    
        res.cookie('JWT_HTTPONLY_Cookie', token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 168 * 60 * 1000
        })

        return res.status(200).send(token);
    }
}

export { loginUser, registerUser };