import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './Routes/AuthRouter.js';  
import ProductRouter from './Routes/ProductRouter.js';
import './Models/db.js';  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter); 
app.use('/product', ProductRouter); 

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
