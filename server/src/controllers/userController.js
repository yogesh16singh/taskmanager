const { checkValidString, isValidEmail } = require("../utils/validator");
const userService = require("../services/userService")

exports.createUser = async(req,res)=>{
    console.log("req.body",req.body);
    try{
        const {firstName,lastName,email,password,isGoogleUser=false} = req.body || {}; 
        if(!firstName || (!isGoogleUser && !lastName) || !checkValidString(firstName) || (!isGoogleUser && !checkValidString(lastName))){
            return res.status(400).send({
                status : false,
                message : `Pls Enter valid first name and last name`
            })
        }
        if(!email || !isValidEmail(email)){
            return res.status(400).send({
                status : false,
                message : `Pls Enter valid email`
            })
        }
        if(!isGoogleUser && !password){
            return res.status(400).send({
                status : false,
                message : `Password is mandatory`
            })
        }
        const {status,code,data,message} = await userService.createUser(req?.body)
        console.log(status,code,data,message);
        
        return res.status(code ||200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while creating user : `,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while creating user : ${error.message}`
        })
    }
}

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body || {}; 
        if(!email || !isValidEmail(email)){
            return res.status(400).send({
                status : false,
                message : `Pls Enter valid email`
            })
        }
        if(!password){
            return res.status(400).send({
                status : false,
                message : `Password is mandatory`
            })
        }
        const {status,code,data,message} = await userService.loginUser(req.body)
        return res.status(code ||200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while log in user : `,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while log in user : ${error.message}`
        })
    }
}