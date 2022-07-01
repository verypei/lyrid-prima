
const {Users} = require('../models')

//authorization digunakan untuk mencari data yg user id nya sama dengan org yg sedang login

function authorization(req, res, next){
    
    let id = req.params.id
    Users.findOne({
        where: {id:req.user.id}
    })
    .then(data => {
        if(!data){
            res.status(404).json({message:"data not found"})
        }
        else{
            if(data.id===req.user.id){
                next()
            }
            else{
                res.status(400).json({message:"forbiden access in authorization"})
            }
        }
    })
    .catch(err=>{
        res.status(500).json(err.message)
    })
}

module.exports = authorization