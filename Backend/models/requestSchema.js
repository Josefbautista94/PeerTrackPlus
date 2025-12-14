import mongoose from "mongoose";

const postRequestSchema = mongoose.Schema({
    title: { type: String, required: true},
    level: { type: String, required: true},
    urgency: { type: String, required: true},
    content: { type: String, required: true},
    createdBy: { 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: { type: String },
        email: { type: String }
    },
    date: { type: Date, default: Date.now }
},
{ timestamps: true });

const PostRequest = mongoose.model('Request', postRequestSchema);

export default PostRequest;