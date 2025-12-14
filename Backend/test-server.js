import express from 'express';

const app = express();

app.use(express.json());

app.post('/test', (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    res.json({ 
        receivedHeaders: req.headers,
        receivedBody: req.body 
    });
});

app.listen(3000, () => {
    console.log('Test server running on port 4000');
});