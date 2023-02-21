import mongoose from "mongoose";
const {Schema} =  mongoose

const userSchema = new Schema({
    name:{
        type: String,
        uppercase: [true],
        required: [true, "please provide the course name"],
        minLength: [3, "{VALUE} is not a valid course name"],

    },
    email:{
        type: String,
        unique:[true, "email must be unique"],
        required: [true, 'please provide valid email']
    },
    password:{
        type: String,
        required: [true, 'please provide password'],
        minLength: [8, 'please provide valid std password'],
    }
})
export const airbnbSchema = mongoose.model('userSchema',userSchema) 
