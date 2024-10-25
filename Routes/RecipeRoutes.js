import express from 'express';
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from '../Controllers/RecipeController.js';
import { upload } from '../Config/cloudinary.js'; // Cloudinary upload

const router = express.Router();

// Create new recipe with image upload
router.post('/create', upload.single('image'), createRecipe);

// Get all recipes
router.get('/gateall', getAllRecipes);

// Get a single recipe by ID
router.get('/singleRecipe/:id', getRecipeById);

// Update a recipe
router.put('/update/:id', upload.single('image'), updateRecipe);

// Delete a recipe
router.delete('/delete/:id', deleteRecipe);

export default router;
