const express=require('express');

const router=express.Router();
const {singup,login, editProfile}=require('../controllers/authController');
const { getAllProduct } = require('../controllers/productController');
const { addOrder, getAllOrderByUserID, getAllOrder } = require('../controllers/orderController');
const mailSender = require('../utils/mailSender');
const { isSeller, auth } = require('../middlewares/auth');
router.post("/login",login);
router.post("/singup",singup);
router.get('/product',getAllProduct);
router.post('/updateprofile',editProfile);
router.post('/addorder',addOrder);
router.post('/getorder',getAllOrderByUserID);
router.post('/sendemail',mailSender);
router.post('/allorder',auth,isSeller,getAllOrder);
module.exports = router;