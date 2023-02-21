import express from "express";
import {
    userLogin,
    userRegister
} from "../controllers/userControllers.js"


const userRouter = express.Router();

// Login
userRouter.route("/login").post(userLogin);

// Registration
userRouter.route("/register").post(userRegister);

export default userRouter; 
