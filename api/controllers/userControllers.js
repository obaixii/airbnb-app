import { airbnbSchema } from "../model/userSchema.js";
import bcrypt from "bcrypt";


// Login
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // If email field is empty - RETURN
        if (!email) {
            return next(new Error("Please Enter Email to login"))
        };

        // If password field is empty - RETURN
        if (!password) {
            return next(new Error("Please Enter Password to login"))
        };

        // Checks if user exist in DB - based on email
        const user = await airbnbSchema.findOne({ email });

        // If user does not exist in DB - RETURN 
        if (!user) {
            return next(new Error("Email not Found, Please Enter Correct Email to login"))
        };

        // Checks if user's entered password is correct or not
        const passMatched = await bcrypt.compare(password, user.password)

        // If Password is incorrect - RETURN 
        if (!passMatched) {
            return next(new Error("Password not matched, Please Enter correct Password to login"))
        }

        res.json("login")
    } catch (error) {
        next(error)
    }
}

// Register
export const userRegister = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Checks if user exist in DB - based on email
        const user = await airbnbSchema.findOne({ email });

        // If user does exist in DB - RETURN 
        if (user) {
            return next(new Error("Already Register, Please Enter another Email to register"))
        };

        const hash = await bcrypt.hash(req.body.password, 10)
        req.body.password = hash

        const newUser = await airbnbSchema.create(req.body);
        console.log(newUser);
        if (newUser) {
            res.json({
                message: "New User has been Added Successfully"
            });
        }

    } catch (error) {
        next(error)

    }
}