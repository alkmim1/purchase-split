import { mongoose } from "mongoose";
async function dbConnection () {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        throw new Error(error);
    }
}

export { dbConnection }
