import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
// variables for express and middlewares
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()) // this always goes before routes
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

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