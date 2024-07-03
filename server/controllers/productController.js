const mongoose=require('mongoose');
const Product=require('../models/ProductSchema');

exports.getAllProduct= async (req,res)=>{
try{
    const products=await Product.find();

    return res.status(200).json({
        sucess:true,
        data:products,
        message:'all product retrive sucessfully'
    })

}
catch(error){
    console.log(error);
    return res.status(500).json({
        sucess:false,
        message:'internal server error',
    })
}
}