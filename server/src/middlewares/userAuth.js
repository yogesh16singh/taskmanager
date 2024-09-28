const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.userAuth = async(req,res,next)=>{
    try{
        const token = req.header('x-auth-token')
        const authType = req.header('x-auth-type')
        const googleAuthEmail = req.header("x-auth-email")
        if (!token && !googleAuthEmail)
            return res.status(401).send({ status: false, message: "TOKEN_NOT_FOUND" });
        let isUserExists
        let decodedTokenData 
        if(authType == "google" && googleAuthEmail){
            isUserExists = await userModel.findOne({
                isDeleted : false,
                email : googleAuthEmail,
                isGoogleUser : true
            })
        }else{
            decodedTokenData = jwt.verify(token, process.env.JWTPRIVATEKEY_USER)
            const {userId,email} = decodedTokenData || {}
            isUserExists = await userModel.findOne({
                isDeleted : false,
                _id : userId,
                email : email
            })
        }
        if(!isUserExists){
            return res.status(403).send({ status: false, message: "UNAUTHORISED_USER" })
        }
        req.user = authType == "google" ? {email : googleAuthEmail,userId : isUserExists?._id}  : decodedTokenData;
        next();
    }catch(error){
        res.status(401).send({ status: false, message: "INVALID_TOKEN" });
    }
}