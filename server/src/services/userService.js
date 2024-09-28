const userModel = require("../models/userModel")
const { securepw, comparePw } = require("../utils/validator")

exports.createUser = async(bodyData)=>{
    const {firstName,lastName,email,password,isGoogleUser} = bodyData || {}

    const isUserExists = await userModel.findOne({
        isDeleted : false,
        email
    })

    if(isUserExists) {
        return {
            status : isGoogleUser ? true : false,
            code : isGoogleUser ? 200 : 400,
           ...(!isGoogleUser && { message :'Please click on Login to continue!!'})
        }
    }
    let hashedPw
    if(!isGoogleUser){
        hashedPw = await securepw(password)
    }

    const user = await userModel.create({
        firstName,
        ...(!isGoogleUser && {lastName}),
        email,
        ...(!isGoogleUser && {password: hashedPw}),
        isGoogleUser: isGoogleUser
    })

    const token = await user.generateToken()

    return {
        status : true,
        code : 201,
        message : 'User created Successfully',
        data : token
    }

}

exports.loginUser = async(bodyData)=>{
    const {email,password} = bodyData || {}
    const user = await 
        userModel.findOne({
            isDeleted : false,
            email
        })

    if(!user) {
        return {
            status : false,
            code : 400,
            message :'Pls click on SignUp Button to continue.'
        }
    }

    const userPw = user?.password || ""
    
    if(!await comparePw(password,userPw)){
        return {
            status : false,
            code : 400,
            message : `Invalid Credentials.`
        }
    }

    const token = await user.generateToken()
    return {
        status : true,
        code : 200,
        data : token
    }
}