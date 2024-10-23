// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
