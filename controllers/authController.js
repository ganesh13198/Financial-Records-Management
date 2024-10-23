import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export const register = async (req,res) => {

    try {
        
        const {username, email, password} = req.body;

        // checking user already exists or not
        const exists = await User.findOne({email});
        if (exists) {
            return res.json({success:false, message: "User already exists"})
        }

        // validatin email fomate & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Please enter a valid email"})
        }
        if (password.length < 4) {
            return res.json({success:false, message: "Please enter strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // create new user
        const newUser = new userModel({
            username,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

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
