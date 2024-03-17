const mongoose = require("mongoose");




mongoose.connect("mongodb://localhost:27017/paytm");


const userSchema = new mongoose.Schema({
  username: { type: String,
    required:true,
    unique:true,
    lowercase:true,
    minLength:3,
    maxLength:10
  },
  password: {
    type: String,
    required: true,

    minLength:3,
    maxLength:10,
  },

  firstName:{
       type:String,
       required:true,
       trim:true,
       minLength:10
  },
  lastName: {
       type:String,
       required:true,
       trim:true,
       minLength:10
  }
});

const account=new mongoose.Schema({
       userid:{
              type:mongoose.Types.ObjectId,
              ref:"User"
       },
       balance:{
           type:Number,
           required:true
       }
})
const User = mongoose.model("User", userSchema);
const Account=mongoose.model("Account",account);
module.expors={
       User,Account
}