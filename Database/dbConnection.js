import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "RecipeApp" })
        .then(() => {
            console.log("Connected to the database.");
        })
        .catch((error) => {
            console.log(`Error occurred while connecting to the database: ${error}`);
        });
};

export default dbConnection;
