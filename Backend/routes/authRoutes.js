import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '24h'}
    )
}

// create request, moved it from the userRoutes to convert to register
router.post('/register', async (req, res) => {
    console.log('Request received!');
    console.log('req.body:', req.body); 
    try {
        const { name, email, password, role, skills } = req.body; 
        
        // Check if user already exists
        const existUser = await User.findOne({email});
        if(existUser) {
            return res.status(400).json({message: 'Email already in use.'})
        }

        // Create new user
        const newUser = new User({ name, email, password, role, skills });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);

        // Prepare user response
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            score: newUser.score
        };

        // Send response 
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: userResponse
        });
        
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password');

        if(!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const isMatch = await user.isCorrectPassword(password);

        if(!isMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = generateToken(user._id);

           const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            score: user.score
        };
        res.json({
            message: 'Login successful',
            token,
            user: userResponse
        });

//            {
//        "email": "adrian@exampl.com",
//        "password": "password123"
//    }

    }catch (err) {
        console.error('Registration error:', err);  // Log the full error
        res.status(400).json({message: err.message})
    }
}); 

// for session sake, and population data request yourself or session
router.get('/me', protect, async (req, res) => {
    res.json(req.user);
});

export default router;