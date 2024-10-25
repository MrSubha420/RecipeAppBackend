import express from "express";
import cors from "cors";
import dbConnection from "./Database/dbConnection.js";
import recipeRoutes from "./Routes/RecipeRoutes.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({path: "./config/config.env"})

const app = express();

// Connect to the database
dbConnection();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Enables URL-encoded data parsing

// Routes
app.use("/api/v1/recipe", recipeRoutes);

export default app;

