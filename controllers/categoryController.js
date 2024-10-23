// controllers/categoryController.js
import Category from '../models/Category.js';

// Add a new category
export const addCategory = async (req, res) => {
    const { name, type } = req.body;
    try {
        const newCategory = await Category.create({ name, type });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        Object.assign(category, req.body);
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        
        await Category.findByIdAndDelete(req.params.id);

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

