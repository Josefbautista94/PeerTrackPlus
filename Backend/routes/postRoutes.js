import express from 'express';
import PostRequest from '../models/requestSchema.js';
import { protect, adminOnly } from '../middleware/auth.js'
const router = express.Router();

////////////////////////// REQUEST CRUD ///////////////////////////////////////
// create request
router.post('/requests', protect, async(req, res) => { // 
    try{
        const { title, level, urgency, content } = req.body; // 
        const newPostRequest = new PostRequest({ title, level, urgency, content });
        await newPostRequest.save();
        res.status(201).json(newPostRequest);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
});
// read request and able to post
router.get('/requests', protect, async(req, res)=> {
    try {
        const allReqPost = await PostRequest.find({});
        res.json(allReqPost)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
});
//find post by id
router.put('/requests/:id', protect, async(req, res) => {
    try {
        const ReqPost = await PostRequest.findById(req.params.id)
        .populate('createdBy', 'name');
        res.json(ReqPost)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
});
// delete admin must be ableto delete any REQUEST

router.delete('/requests/:id', protect, adminOnly, async(req, res)=> {
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

export default router;