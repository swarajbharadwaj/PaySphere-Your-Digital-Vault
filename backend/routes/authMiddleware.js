const JWT_SECRET=require('./config');
const  jwt = require("jsonwebtoken");
function authMiddleware(req,res,next){
const {Authorization}=req.header;
if(!Authorization.startsWith('Bearer ')|| !Authorization)return res.status(403).json({});
const token=auth.split(' ')[1];
const decoded=jwt.verify(token,JWT_SECRET);
req.userid=decoded.userid;




}
module.exports={authMiddleware};