import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("mongoDb is already connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share-prompt",
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log("mongoDb connected");
    }
    catch(err){
        console.log(err);
    }
}