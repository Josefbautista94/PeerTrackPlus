import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    title: { type: String, required: true},
    contet: { type: String, required: true},
    date: { type: Date, default: Date.now }
});

const Request = mongoose.model('Request', requestSchema);

export default Request;