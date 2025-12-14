import express from 'express';
import dotenv from 'dotenv';
import userSeed from './data/userSeed.js';
import requestSeed from './data/requestSeed.js';
import mongoose from 'mongoose';
import User from './models/userSchema.js';
import PostRequest from './models/requestSchema.js';

dotenv.config();
//connects to the db to initialize insertion
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("Conneted to MongoDB for seeding");
    return seedData();
})
.catch((err) => {
    console.error('Connection Error:', err.message);
    process.exit(1);
});
//insert data
async function seedData() {
    try {
        await User.deleteMany(); // clearing mongodb from users. preventing any conflicts
        await PostRequest.deleteMany();

        const newUsers = await User.insertMany(userSeed);
        const newPost = await PostRequest.insertMany(requestSeed);

        console.log("Users, and posts requests have been seeded succesfully");
        process.exit();
    }
    catch(error) {
        console.error(`Something went wrong loading the seed data: ${err.message}`);
          process.exit(1);
    }
}