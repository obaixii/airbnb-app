import mongoose from "mongoose";

const dbConnect = async ()=>{
    await mongoose.connect(process.env.DB_URI,(con)=>{
        console.log(`database connected Successfully ${con}`);
    })
}

export default dbConnect;