import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
         // checking user already exists or not
        const user = new User({ username, password, email });
        const exists = await User.findOne({email});
        if (exists) {
            return res.json({success:false, message: "User already exists"})
        }
        
        // validatin email fomate & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Please enter a valid email"})
        }
        if (password.length < 6) {
            return res.json({success:false, message: "Please enter strong password"})
        }
       
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password , email } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
