import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes); // localhost:5000/posts
// Use Mongodb cloud atlas
// const CONNECTION_URL = 'mongodb+srv://danny_zyh:bruin-on-sale@cluster0.dhu6d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  () => app.listen(PORT, 
    () => console.log(`Server running on ${PORT}`))
).catch( // connection not successful
  (error) => console.log(error.message)
);


