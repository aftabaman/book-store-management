import express from 'express';
import { BOOK } from '../modules/bookModules.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try{
        if(!request.body.title ||
            !request.body.author ||
            !request.body.publishYear)
            {
                return response.status(400).send({message: "send all required fields: title, author, publishYear"});
            }
        
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await BOOK.create(newBook);
        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({messsage: error.message});
    }
})

router.get('/:id', async (request, response)=>{
    try{

        const { id } = request.params;
        const book = await BOOK.findById(id);
        if(!book)
        {
            return response.status(400).send({ message : "book not found!!"});
        }   
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});

router.get('/', async (request, response)=>{
    try{
        const books = await BOOK.find({});
        if(!books)
        {
            return response.status(400).send({ message : "book not found!!"});
        }   
        return response.status(200).json(books);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});

router.put('/:id', async (request, response)=>{

    try{
        if(!request.body.title ||
            !request.body.author ||
            !request.body.publishYear)
            {
                return response.status(400).send({message: "send all required fields: title, author, publishYear"});
            }
        
        const {id} = request.params;
        const book = await BOOK.findByIdAndUpdate(id,request.body);
        
        if(!book)
        {
            return response.status(400).send({ message : "book not found!!"});
        }

        return response.status(200).send({ message : "book is updated!!"});
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({messsage: error.message});
    }

});

router.delete('/:id', async (request, response)=>{
    try{

        const { id } = request.params;
        const book = await BOOK.findByIdAndDelete(id);
        if(!book)
        {
            return response.status(400).send({ message : "book not found!!"});
        }
        return response.status(200).json({ message : "book is deleted!!"});
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});


export default router;