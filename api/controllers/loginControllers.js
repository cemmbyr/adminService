const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/registerUserModels');
const Admin = require('../models/registerAdminModels');
exports.renderIndex = (req, res, next) => {
    return res.render('login')
}
exports.login_post_all = (req,res,next)=>{ 
    console.log(req.body)
    Admin.findOne({email:req.body.email}).exec()
    .then(admin =>{
         if(!admin){
            User.findOne({username:req.body.email}).exec()
            .then(user=>{
                if(!user){
                    console.log(user);
                    return res.render('login');
                }
                else{
                    bcrypt.compare(req.body.password, user.password, (err,result)=>{
                        if(!result){
                            return res.render('login');
                        }
                        if(result){
                            return res.status(200).json({
                                message: 'Succesful'
                            });
                        }
                    });
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error:err
                });
            })  
        } else {
            bcrypt.compare(req.body.password, admin.password, (err,result) =>{
                if(!result){
                   return res.render('login')
                }
                if(result){
                    return res.status(200).json({
                       message: 'Succesful'
                    });
                }
            });
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
           error:err
        });
    })
    
}
/*exports.login_post_all_user = (req,res,next)=>{ 
    console.log(req.body)
    User.findOne({username:req.body.email}).exec()
    .then(user =>{
         if(!user){
             console.log(user)
             return res.render('login')
        } else {
            bcrypt.compare(req.body.password, user.password, (err,result) =>{
                if(!result){
                    return res.render('login')
                 }
                if(result){
                    return res.status(200).json({
                       message: 'Succesful'
                    });
                }
            });
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
           error:err
        });
    })
    
}*/