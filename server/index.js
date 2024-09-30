const express=require('express');
require("dotenv").config();
const Razorpay=require('razorpay');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db=require('./config/database');
const authRoutes=require('./routes/authRoutes')
const paymentRoutes=require('./routes/paymentRoutes');
const port=process.env.PORT || 4000
const app=express();
db.db();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("hello");
})

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.use("/api/v1",authRoutes);
app.use("/api/v1",paymentRoutes);
app.listen(port,()=>{
    console.log(`server is listening at Port ${port}`)
});

