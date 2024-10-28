import Recipe from '../Models/RecipeSchema.js';
import { cloudinary, upload } from '../config/cloudinary.js'; // Cloudinary configuration

// Create Recipe
export const createRecipe = async (req, res) => {
   try {
      const { name, ingredients, instructions, cookingTime } = req.body;

      // Check if required fields are present
      if (!name || !ingredients || !instructions || !cookingTime) {
         return res.status(400).json({ message: 'All fields are required' });
      }

      // Cloudinary image URL if uploaded
      const imageUrl = req.file ? req.file.path : null;

      // Create new recipe
      const newRecipe = await Recipe.create({
         name,
         ingredients: ingredients.split(','), // Assumes ingredients are comma-separated, adjust as needed
         instructions: Array.isArray(instructions) ? instructions : instructions.split(','),
         cookingTime,
         image: imageUrl,
      });

      res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
   } catch (error) {
      res.status(400).json({ message: 'Error creating recipe', error: error.message });
   }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
   try {
      const recipes = await Recipe.find();
      res.status(200).json(recipes);
   } catch (error) {
      res.status(500).json({ message: 'Error fetching recipes', error: error.message });
   }
};

// Get a single recipe by ID
export const getRecipeById = async (req, res) => {
   try {
      const { id } = req.params;
      const recipe = await Recipe.findById(id);

      if (!recipe) {
         return res.status(404).json({ message: 'Recipe not found' });
      }

      res.status(200).json(recipe);
   } catch (error) {
      res.status(500).json({ message: 'Error fetching recipe', error: error.message });
   }
};

// Update a recipe by ID
export const updateRecipe = async (req, res) => {
   try {
      const { id } = req.params;
      const { name, ingredients, instructions, cookingTime } = req.body;
      const imageUrl = req.file ? req.file.path : null;

      // Find existing recipe by ID
      const recipe = await Recipe.findById(id);
      if (!recipe) {
         return res.status(404).json({ message: 'Recipe not found' });
      }

      // Remove old image from Cloudinary if a new one is uploaded
      if (imageUrl && recipe.image) {
         const oldImagePublicId = recipe.image.split('/').pop().split('.')[0];
         await cloudinary.v2.uploader.destroy(`recipes/${oldImagePublicId}`);
      }

      // Update recipe details
      recipe.name = name || recipe.name;
      recipe.ingredients = ingredients ? ingredients.split(',') : recipe.ingredients;
      recipe.instructions = instructions ? (Array.isArray(instructions) ? instructions : instructions.split(',')) : recipe.instructions;
      recipe.cookingTime = cookingTime || recipe.cookingTime;
      recipe.image = imageUrl || recipe.image;

      const updatedRecipe = await recipe.save();
      res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
   } catch (error) {
      res.status(400).json({ message: 'Error updating recipe', error: error.message });
   }
};

// Delete a recipe by ID
export const deleteRecipe = async (req, res) => {
   try {
      const { id } = req.params;

      const recipe = await Recipe.findById(id);
      if (!recipe) {
         return res.status(404).json({ message: 'Recipe not found' });
      }

      // Remove image from Cloudinary
      if (recipe.image) {
         const imagePublicId = recipe.image.split('/').pop().split('.')[0];
         await cloudinary.v2.uploader.destroy(`recipes/${imagePublicId}`);
      }

      // Delete recipe
      await Recipe.findByIdAndDelete(id);
      res.status(200).json({ message: 'Recipe deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: 'Error deleting recipe', error: error.message });
   }
};
