import { mongoose } from "mongoose";
export const serverConnection = async () => {
    try {
        mongoose
            .connect("mongodb+srv://muhammedfayisthangal:labnUaoXCZHapj9z@cluster0.mkcfuy2.mongodb.net/")
            .then(() => console.log("mongodB connected"));
    } catch (error) {
        throw Error;
    }
};

//  locally  mongodb://localhost:27017/result
// globby    mongodb+srv://muhammedfayisthangal:labnUaoXCZHapj9z@cluster0.mkcfuy2.mongodb.net/
