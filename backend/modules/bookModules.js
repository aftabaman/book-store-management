import mongoose, { mongo } from "mongoose";

const bookSchema = mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishYear: {
        type: Number,
        required: true,
    },

},
{
    timeStamps: true,
}
);


export const BOOK = mongoose.model('Book',bookSchema);