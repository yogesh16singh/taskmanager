const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        trim : true
    },
    lastName : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        trim : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    isGoogleUser : {
        type : Boolean,
        default : false
    }
},{timestamps:true})

userSchema.methods.generateToken = async function(){
    return jwt.sign({
        userId: this._id,
        email : this.email
    }, process.env.JWTPRIVATEKEY_USER);
}

module.exports = mongoose.model("User",userSchema)
