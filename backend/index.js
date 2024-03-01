import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { BOOK } from "./modules/bookModules.js";
import { request } from "http";
import exp from "constants";
import booksRoute from './routes/booksRoutes.js';
import cors  from 'cors';

const app  = express();

app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin:'*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-type']

// }));

app.use('/books',booksRoute);


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("welcome to bookstore !");
});


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log(`App is connected to Database!`);
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        });
        
    })
    .catch((error)=>{
        console.log(error);
    })