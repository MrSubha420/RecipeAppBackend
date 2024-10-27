import express from "express";
import cors from "cors";
import dbConnection from "./Database/dbConnection.js";
import recipeRoutes from "./Routes/RecipeRoutes.js";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config({path: "./config/config.env"})

const app = express();

// Connect to the database
dbConnection();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
   origin: [process.env.DASHBOARD_URL],
   methods: ["GET","POST","DELETE","PUT"],
   credentials : true,
}));
app.use(express.urlencoded({ extended: true })); // Enables URL-encoded data parsing
// app.use(fileUpload({
//    useTempFiles: true,
//    tempFileDir: "/tmp/",
// }));
// Routes
app.use("/api/v1/recipe", recipeRoutes);

export default app;

