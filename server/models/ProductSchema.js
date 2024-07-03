const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type:String,
        required: true,
    },
    discountPercentage: {
        type:String,
        required: true,
    },
    rating:{
        type:Number,
    },
    stock: {
        type: Number,
        required: true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
   
    images: [String], 
   
});

module.exports = mongoose.model('Product', productSchema);
