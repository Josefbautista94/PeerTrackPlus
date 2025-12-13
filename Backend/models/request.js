import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    date: { type: Date, default: Date.now }
});

const PostRequest = mongoose.model('Request', requestSchema);

export default PostRequest;