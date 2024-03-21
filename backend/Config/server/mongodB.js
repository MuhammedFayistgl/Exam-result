import { mongoose } from "mongoose";
export const serverConnection = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/result').then(() => console.log('mongodB connected'))

    } catch (error) {
        throw Error

    }

}
