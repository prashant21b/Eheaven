const mongoose=require('mongoose');


const userSchemas=mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true

    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    accountType:{
        type: String,
        enum: ["Buyer", "seller"],
        default:"Buyer"
      },
      cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart",
      },
      order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',

      },
      wishList:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'WishList',
      }

},{timestamps:true})

module.exports=mongoose.model("User",userSchemas);