const express=require('express');
const {
  checkout,
  paymentVerification,
} =require('../controllers/paymentController');
const { addOrder } = require('../controllers/orderController');

const router = express.Router();

router.post("/checkout",checkout)

router.post("/paymentverification",paymentVerification,addOrder);

module.exports= router;
