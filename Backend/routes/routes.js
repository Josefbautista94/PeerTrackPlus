// dependencies
import express from 'express';
import User from '../models/userSchema.js';

/////////////////////////// USER CRUD //////////////////////////////////////
// router
const router = express.Router();
/// create
router.post('/', async (req, res) => { // 
    try{
        const { name, email } = req.body; // 
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
});

// read
router.get('/', async(req, res) => {
    try {
        const allUsers = await User.find({}) // read from DB.
        res.json(allUsers);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.get('/:id', async(req, res) => {
    try {
        const singleUser = await User.findById(req.params.id) // read from DB.
        res.json(singleUser);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
})
// update

// delete -  make sure only admins can actually 


////////////////////////// REQUEST CRUD ///////////////////////////////////////
// create request

// read request and able to post

// update? does an admin really need this?

// delete admin must be ableto delete any REQUEST