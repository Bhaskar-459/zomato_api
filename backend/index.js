import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import getRoutes from './routes.js';
import dotenv from 'dotenv';
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MongoDB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log("connection error", error.message);
});

// Routes
app.use('/get', getRoutes);

app.listen(process.env.port, () => {
    console.log('Server is running on port 5000');
});

