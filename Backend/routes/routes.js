// dependencies
import express from 'express';
import User from '../models/userSchema.js';

/////////////////////////// USER CRUD //////////////////////////////////////
// router
const router = express.Router();
/// create

// read
router.get('/', async(req, res) => {
    try {
        const allUsers = await User.find({}) // read from DB.
        res.json(allUsers)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})
// update

// delete -  make sure only admins can actually 


////////////////////////// REQUEST CRUD ///////////////////////////////////////
// create request

// read request and able to post

// update? does an admin really need this?

// delete admin must be ableto delete any REQUEST