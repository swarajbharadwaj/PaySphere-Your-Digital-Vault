const express=require('express');
const { authMiddleware } = require('./authMiddleware');
const Router=express.Router();
const {Users} =require('./db');
const { default: mongoose } = require('mongoose');

Router.get('/balance',authMiddleware,async(res,req)=>{
       const user=await Users.findOne({
              _id:req.query.id,
       })
      return  res.json({
              balance:user.balance,
       })
})
Router.post('/transfer',authMiddleware,async (res,req)=>{
 const {to,from,amount}=req.body;
 const session=mongoose.startSession();
 (await session).startTransaction();
await account.updateOne({userid:from.userid},{$inc: {balance:balance-amount} }).session(session);
await account.updateOne({userid:to.userid},{$inc:{balance:amount}});



})
module.exports=Router;
