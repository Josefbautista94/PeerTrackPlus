// dependencies
import express from 'express';
import User from '../models/userSchema.js';
import PostRequest from '../models/userSchema.js';

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
router.put('/id', async (req, res) => {
    try {
       const updateUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
})
// delete -  make sure only admins can actually 
router.delete('/:id', async(req, res)=> {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.json(deleteUser);
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
});

////////////////////////// REQUEST CRUD ///////////////////////////////////////
// create request
router.post('/', async(req, res) => { // 
    try{
        const { title, content } = req.body; // 
        const newPostRequest = new PostRequest({ title, content });
        await newPostRequest.save();
        res.status(201).json(newPostRequest);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
});
// read request and able to post
router.get('/', async(req, res)=> {
    try {
        const allReqPost = await PostRequest.find({});
        res.json(allReqPost)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
});
// update? does an admin really need this?
router.get('/:id', async(req, res) => {
    try {
        const ReqPost = await PostRequest.findById(req.params.id);
        res.json(ReqPost)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
});
// delete admin must be ableto delete any REQUEST