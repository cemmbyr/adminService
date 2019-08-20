const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/registerUserModels');
exports.renderIndex = (req, res, next) => {
    return res.render('registerUser')
}

/*exports.user_get_all = (req,res,next)=>{
    User.find()
    .select('_id name surname password')
    .exec()
    .then(docs =>{
        if(docs.length>=0){
        const response = {
            count: docs.length,
            user: docs.map(doc => {
                return{
                    username:doc.username,
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

exports.user_post_all = (req,res,next)=>{
    User.find({username:req.body.username})
    .exec().then(user=>{
        if(user.length>=1){
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
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash
                    });
                    user.save().then(result=>{
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

exports.user_delete_all = (req,res,next)=>{
    const id = req.params.userId;
    User.remove({_id:id})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'User Delete',
            request:{
                type: 'POST',
                url: 'http://localhost:3000/register',
                body: {username: 'String', password: 'Password'}
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
}