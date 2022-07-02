require("dotenv").config()
const {Users} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Authentication = require("../middleware/authentication");

class userController{

    static async register(req,res){
        let obj = {
            email:req.body.email,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            password:req.body.password
        }
        try {
            let email = await Users.findOne({where:{email:obj.email}});
            if(!email){
                let data = Users.create(obj);
                let token = jwt.sign({id: data.id, email: data.email}, process.env.JWT_SECRET);
                res.status(201).json({token})
            } 
            else{
                res.status(422).json({message : "email already taken"})
            } 
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async login(req,res){
        let email=req.body.email
        let password=req.body.password
        let data = await Users.findOne({where:{email}})
        if(data){
            if(bcrypt.compareSync(password, data.password)){
                let token = jwt.sign({id: data.id, email: data.email}, process.env.JWT_SECRET)
                res.status(200).json({token})
            } else {
                res.status(400).json({message: 'wrong password'});
            }
        }
        else{
            res.status(404).json({message : "email not found"});
        }
    }
}
module.exports=userController