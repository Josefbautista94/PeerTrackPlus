// dependencies
import express from 'express';
import User from '../models/userSchema.js';
const router = express.Router();


// CREATE
router.post('/users', async (req, res) => { // 
    try{
        const { name, email, password } = req.body; // 
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
});

// READ ALL
router.get('/users', async(req, res) => {
    try {
        const allUsers = await User.find({}).select('-password') 
        res.json(allUsers);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});
// READ BY ID 1 USER
router.get('/users/:id', async(req, res) => {
    try {
        const singleUser = await User.findById(req.params.id);
        if (!singleUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(singleUser);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

// UPDATE
router.put('/users/:id', async (req, res) => {
    try {
       const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if (!updateUser) {
           return res.status(404).json({ message: 'User not found' });
       }
       res.json(updateUser);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

// DELETE
router.delete('/users/:id', async(req, res)=> {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', user: deleteUser });
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

export default router;