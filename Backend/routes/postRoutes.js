// dependencies
import express from 'express';
import PostRequest from '../models/userSchema.js';
const router = express.Router();

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

router.delete('/:id', async(req, res)=> {
    try {
        const deleteReqPost = await PostRequest.findByIdAndDelete(req.params.id);
        res.json(deleteReqPost);
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
});