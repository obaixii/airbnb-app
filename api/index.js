import express from "express";
import bodyParse from "body-parser"
import cors from "cors";
import userRouter from "./routes/userRouter.js"
import dbConnect from "./config/dbConnect.js";
import * as dotenv from "dotenv";
import {errorHandler} from "./middlewares/errorHandler.js"

const app = express();
dotenv.config();
dbConnect();

app.use(bodyParse.json())
app.use(cors({
    origin: 'http://localhost:5173'
})); // Accepts Requests from only Local Host @ 5173

app.use("/",userRouter);


app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});