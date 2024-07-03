const mongoose = require('mongoose');
const Order = require('../models/OrderSchema');
const orderid = require('order-id')('key');

exports.addOrder = async (req, res) => {
    try {
        const { user, products, shippingAddress, totalAmount} = req.body;
        console.log("product", products);
        const orderNumber = orderid.generate();
        console.log(req.body);
        const newOrder = new Order({
            orderNumber,
            user,
            products,
            shippingAddress,
           // paymentMethod,
            totalAmount,
        });
        const savedOrder = await newOrder.save();

        res.status(201).json({
            sucess: true,
            data: savedOrder,
            message: 'order added sucessfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add the order' });
    }
}

exports.getAllOrderByUserID=async(req,res)=>{
    try{
const {user}=req.body;
const isOrder = await Order.find({ user })
      .populate({
        path: 'products.product', 
        model: 'Product', 
      });
 if(!isOrder){
    return res.status(404).json({
        sucess:false,
        message:'order not found',
    }) 
 }
 else{
    return res.status(200).json({
        sucess:true,
        data:isOrder,
        message:'order get sucessfully',
    })
 }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:true,
            message:'internal server error',
        })
    }

}

exports.getAllOrder=async(req,res)=>{
try{
  const allOrder=await Order.find();
  if(!allOrder){
    return res.status(404).json({
        sucess:false,
        message:'Order not found'
    })
  }
  return res.status(200).json({
    sucess:true,
    data:allOrder,
    message:'all Order fetched sucessfully',

  })
}
catch(error){
console.log(error);
}
}