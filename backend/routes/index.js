const express=require( 'express');
const Router=express.Router();
Router.use('/user', require("./user"));
//Router.use('/account', require('./account'));
module.exports=Router;