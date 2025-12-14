import express from 'express';
import cors from 'cors';
// variables for express and middlewares
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()) // this always goes before routes
app.use(cors());


//


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});