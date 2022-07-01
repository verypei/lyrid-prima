require("dotenv").config();
const {Products, Users} = require("../models");

class Controller{

    static getProducts(req,res){
        Products.findAll({
                limit: 5,
                offset: (req.query.page - 1) * 5,
                order: [
                    ['nama_produk', 'ASC'],
                ]
            })
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
    }

    static getProductById(req,res){
        let id = req.params.id;
        Products.findOne({where:{id}})
        .then(data=>{
            res.status(200).json({data})
        })
        .catch(err=>{
            res.status(404).json({message:"data not found!!!"})
        })
    }

    static addProduct(req,res){
        let obj = {
            kode_produk:req.body.kode_produk,
            nama_produk:req.body.nama_produk,
            qty:req.body.qty,
            image_produk:req.body.image_produk
        }
        let userName = ""
        Users.findOne({where:{id:req.user.id}})
        .then(dataUser=>{
            userName = dataUser.user_name
        })
        .catch(err=>{
            console.log(err,"from add pray in controllers");
        })

        Products.create(obj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            if(err.errors){
                res.status(400).json(errData)
            }
            else{
                res.status(500).json(err)
            }

        })
    }

    static updateProduct(req,res){
        let id = req.params.id
        console.log(req.body,"-----controller");
        let newData={
            kode_produk:req.body.kode_produk,
            nama_produk:req.body.nama_produk,
            qty:req.body.qty,
            image_produk:req.body.image_produk
        }
        console.log(req.user.id,"update=========================",id,"---",newData);
        Products.update(newData,{where:{id:id}})
        .then(resp=>{
            if(resp){
                res.status(200).json(resp)
            }
            else{
                res.status(404).json({
                    message:"data can't be updated / not found"
                })
            }
        })
        .catch(err=>{
            if(err.errors){
                let errData= [];
                for(let i=0;i<err.errors.length;i++){
                    errData.push({message:err.errors[i].message})
                }
                res.status(400).json(errData)
            }
            else{
                res.status(500).json(err)
            }

        })
    }

    static deleteProduct(req,res){
        let id = req.params.id;
        Products.destroy({where:{id:id}})
        .then(data=>{
            if(data){
                res.status(201).json({message:"Data has been removed"})
            }
            else{
                res.status(404).json({message:"error data not found"})
            }
        })
        .catch(err=>{
            res.status(500).json(err)
        })          
    }
}
module.exports=Controller;