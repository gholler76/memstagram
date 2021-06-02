import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();
// set prefix 'posts' to all routes in postRoutes

// limit size of files for stringifying upload pics
app.use( express.json( { limit: "30mb", extended: true } ) );
app.use( express.urlencoded( { limit: "30mb", extended: true } ) );
app.use( cors() );

app.use( '/posts', postRoutes );
app.use( '/user', userRoutes );
// set the mongodb connection and assign a port variable
const PORT = process.env.PORT;

// set the port and get rid of warnings for body parsing and find/modify in update queries
mongoose.connect( process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( () => app.listen( PORT, () => console.log( `Server running on port: ${ PORT }` ) ) )
    .catch( ( err ) => console.log( err ) );
mongoose.set( 'useFindAndModify', false );



