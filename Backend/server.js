import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
// variables for express and middlewares
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()) // this always goes before routes
app.use(cors());
app.use('/api/users', userRoutes);
// Connection to MONGODB
const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        mongoose.connection.once("open", () => {
            console.log("Connected to MongoDB")
        });
    }
    catch (err) {
        console.log(`Cannot connect to the DB ${err}` )
    }
}

connect();

/// place holder route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
