import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

import postRoutes from './routes/posts.js';

const app = express();

// set prefix 'posts' to all routes in postRoutes

// limit size of files for stringifying upload pics
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
// set the mongodb connection and assign a port variable
const CONNECTION_URL = 'mongodb+srv://gary:gary@cluster0.bqnkz.mongodb.net/memories_project?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

// set the port and get rid of warnings for body parsing and find/modify in update queries
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err));
mongoose.set('useFindAndModify', false);



