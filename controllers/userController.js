require("dotenv").config()
const {Users} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Authentication = require("../middleware/authentication");

class userController{

    static register(req,res){
        
        let obj = {
            email:req.body.email,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            password:req.body.password
        }
        console.log(obj,"----->>>>");
// ====================================cari email apakah sudah terdaftar=============================
        Users.findOne({where:{email:obj.email}})
        .then(data=>{
            if(!data){
                Users.create(obj)
                .then(data=>{
                    let token = jwt.sign({id: data.id, email: data.email}, process.env.JWT_SECRET)
                    res.status(201).json({token})
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json(err);
                })
            }
            else{
                res.status(403).json({message:"email already in used"});
            }
        })
        .catch(err=>{
            res.status(500).json(err);
        })
    }

    static login(req,res){
        let email=req.body.email
        let password=req.body.password
        Users.findOne({
            where:{
                email:email
            }
        })
        .then(data=>{
            if(!data){
                res.status(400).json('email wrong')
            } else {
                console.log(data,"-----");
                if(bcrypt.compareSync(password, data.password)){
                    let token = jwt.sign({id: data.id, email: data.email}, process.env.JWT_SECRET)
                    res.status(200).json({token})
                } else {
                    res.status(400).json({message: 'wrong password'});
                }
            }
        })
        .catch(err=>{
            res.status(404).json({message : "email not found"});
        })
    }
}
module.exports=userController