import express from 'express';
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from '../Controllers/RecipeController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post('/create', upload.single('image'), createRecipe);
router.get('/gateall', getAllRecipes); // Adjusted from 'gateall' to 'all' for clarity
router.get('/singleRecipe/:id', getRecipeById);
router.put('/update/:id', upload.single('image'), updateRecipe);
router.delete('/delete/:id', deleteRecipe);

export default router;
