const crypto = require('crypto');
const Payment = require('../models/paymentModel');
const Razorpay = require('razorpay');
const Order = require('../models/OrderSchema');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

exports.checkout = async (req, res) => {
  try {
      console.log("12", req.body);
      
      const options = {
          amount: Number(req.body.amount * 100), 
          currency: "INR",
      };

      const razorpayOrder = await instance.orders.create(options);

      // Create an order in  database
      const order = new Order({
          orderNumber: razorpayOrder.id, 
          user: req.body.user, 
          products: req.body.products, 
          shippingAddress: req.body.shippingAddress, 
          totalAmount: req.body.amount,
          paymentMethod: "online", 
          paymentStatus: "Pending", 
      });

      await order.save();

      res.status(200).json({
          success: true,
          order: razorpayOrder, 
          orderId: order._id, 
      });
  } catch (error) {
      console.error("Error during checkout:", error.message);
      res.status(500).json({
          success: false,
          message: "Checkout failed",
          error: error.message,
      });
  }
};

// exports.paymentVerification = async (req, res) => {
//   try {
//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//       const body = razorpay_order_id + "|" + razorpay_payment_id;

//       const expectedSignature = crypto
//           .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//           .update(body.toString())
//           .digest("hex");

//       const isAuthentic = expectedSignature === razorpay_signature;

//       if (isAuthentic) {
//           // Save payment details to the Payment schema
//           const payment = await Payment.create({
//               razorpay_order_id,
//               razorpay_payment_id,
//               razorpay_signature,
//           });

//           // Update the order status in the Order schema
//           const order = await Order.findOneAndUpdate(
//               { orderNumber: razorpay_order_id },
//               {
//                   paymentStatus: "Paid", 
//                   paymentId: payment._id, 
//                   orderStatus: "Processing", 
//               },
//               { new: true }
//           );

//           if (!order) {
//               throw new Error("Order not found");
//           }

//           res.redirect(
//               `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//           );
//       } else {
//           res.status(400).json({
//               success: false,
//               message: "Invalid signature",
//           });
//       }
//   } catch (error) {
//       console.error("Error during payment verification:", error.message);
//       res.status(500).json({
//           success: false,
//           message: "Payment verification failed",
//           error: error.message,
//       });
//   }
// };


exports.paymentVerification = async (req, res) => {
  try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
          .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
          .update(body.toString())
          .digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
          // Save payment details to the Payment schema
          const payment = await Payment.create({
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
          });

          // Update the order status in the Order schema to "Paid"
          const order = await Order.findOneAndUpdate(
              { orderNumber: razorpay_order_id },
              {
                  paymentStatus: "Paid", 
                  paymentId: payment._id, 
                  orderStatus: "Processing", 
              },
              { new: true } 
          );

          if (!order) {
              throw new Error("Order not found");
          }

          res.redirect(
              `https://eheaven.vercel.app/paymentsuccess?reference=${razorpay_payment_id}`
          );
          
      } else {
          // Handle failed payment verification: Remove the order from the Order schema
          await Order.deleteOne({ orderNumber: razorpay_order_id });

          res.status(400).json({
              success: false,
              message: "Payment verification failed, invalid signature",
          });
      }
  } catch (error) {
      console.error("Error during payment verification:", error.message);

      // Handle case when there's an error during verification: Remove the order from the Order schema
      await Order.deleteOne({ orderNumber: req.body.razorpay_order_id });

      res.status(500).json({
          success: false,
          message: "Payment verification failed",
          error: error.message,
      });
  }
};
