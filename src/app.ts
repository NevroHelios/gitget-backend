import express from 'express';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT) || 3000;

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});