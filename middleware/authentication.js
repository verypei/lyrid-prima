require("dotenv").config();
const jwt = require("jsonwebtoken");

const Authentication = (req,res,next)=>{
  try{
      const {token} = req.headers;
      if(!token){
        res.status(404).json({message:"token not found"})
      }
      else{
        const decoded  = jwt.verify(token,process.env.JWT_SECRET)//harus sama dengn jwt sign di controller user
        req.user=decoded
        next()//fungsi selanjutnya
      }
  }
  catch(error){
      res.status(400).json({message:"forbiden access in authentification"})
  }
}
module.exports=Authentication