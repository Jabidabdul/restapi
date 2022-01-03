const express = require('express');
const app = express();
const routes = express.Router();
const signUpTemplateCopy = require('../models/SignUpModels')

routes.post('/signup', (req, res)=>{
    const {email, password , userName, fullName} = req.body;

    signUpTemplateCopy.findOne({email : email }, (req, user)=>{
        if(user){
            res.send("Registered")
        } 
        else{
            const signUpForm = new signUpTemplateCopy({
                fullName : fullName,
                userName : userName,
                email : email,
                password : password
            })
            signUpForm.save()
            .then(data=>{
                res.send(data)
            })
            .catch(err=>{
                res.send(err)
            })
        } 
    }) 
    
})
routes.post('/login', (req, res)=>{
    const {email, password} = req.body;
    console.log(req.body)
    signUpTemplateCopy.findOne({ email : email}, (req, user)=>{
        if(user){
            if(user.password === password){
                res.send(user)
            }else{
                res.send(false)
            }
        }else{
            res.send("Not found");
        }
        
    }) 
})

module.exports = routes;