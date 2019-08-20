const Admin = require('../models/registerAdminModels');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
exports.renderIndex = (req, res, next) => {
    return res.render('registerAdmin')
}

/*exports.admin_get_all = (req,res,next)=>{
    Admin.find()
    .select('_id email password')
    .exec()
    .then(docs =>{
        if(docs.length>=0){
        const response = {
            count: docs.length,
            admin: docs.map(doc => {
                return{
                    email:doc.email,
                    password:doc.password,
                    _id:doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/register/'+doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
        }else{
            res.status(404).json({
                message: 'This are not user'
            })
        }

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
}*/

exports.admin_post_all =  (req,res,next)=>{
    Admin.find({email:req.body.email})
    .exec().then(admin=>{
        if(admin.length>=1){
            return res.status(409).json({
                message:'Mail exists'
            });
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err             
                    });
                }else{
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    admin.save().then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message:'Admin created'
                        });
                    }).catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                }
            })  

        }
    })
}

exports.admin_delete_all = (req,res,next)=>{
    Admin.remove({_id:req.params.adminId})
    .exec().then(result =>{
        res.status(200).json({
            message:'Admin deleted'
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}