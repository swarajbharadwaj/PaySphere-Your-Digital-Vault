const express=require( 'express');
const Router=express.Router();
const {JWT_SECRET}=require('./config');
const app=express();
const zod=require( 'zod' );
const {User,Account}=require('../db');
const jwt=require("jsonwebtoken");
const {authMiddleware}=require('./authMiddleware');
const siginBody=zod.object({
       username:zod.string(),
       password:zod.string()
})
const signupBody=zod.object({
       username:zod.string().email(),
       password:zod.string(),
       firstName:zod.string(),
       lastName:zod.string()

})
const updateBody=zod.object({
       password:zod.optional(zod.string()),
       firstName:zod.string().optional(),
       lastName:zod.string().optional(),
})
Router.post('/signin',(req,res)=>{
const {success}=zod.safeParse(siginBody,req.body);
if(!success) return res.status(401).json({
       message: "Invalid email or password"
});
const existing_user=User.findOne({
       username:req.body.username,
       password: req.body.password
});
if(existing_user){
       const token=jwt.sign({
              userId: existing_user._id
       },JWT_SECRET);
       res.send( {token} );
}
else{
       return res.status(401).json({
              message:"Invalid email id",
       })

}


});



Router.post('/signup',(req,res)=>{
       const {success}= zod.safeParse(signupBody,req.body);
       if (!success) return res.status(401).json({
              message: "Invalid email or password",
       });
       const existing_user=User.findOne({
              username:req.body.username,
       })
       if(existing_user)return  res.status(409).json({message:'Username already exists'});
       else{
           User.create(req.body);
           const token = jwt.sign({userId:req.body.username}, JWT_SECRET);
           res.send({token});
       }

});
Router.put('/',authMiddleware,(req,res)=>{
const {success}=zod.safeParse(updateBody,req.body);
if(!success)return res.status(403).json({
       message:"invalid input",
})
User.updateOne({_id:userid},req.body);




});

Router.get('/bulk',async (req,res) =>{
const filter=req.query.filter|| "";
const users = await User.find({
       $or: [{
           firstName: {
               "$regex": filter
           }
       }, {
           lastName: {
               "$regex": filter
           }
       }]
   })
   res.json({
       user:users.map((user)=>{
              return{
         userName:user.userName,
         firstName:user.firstName,
         lastName:user.lastName,
              }
       })
   })



});
module.exports=Router;