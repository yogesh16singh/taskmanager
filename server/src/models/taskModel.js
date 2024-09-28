const mongoose = require('mongoose');
const { TASK_STATUSES } = require('../utils/constants');
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = mongoose.Schema({
    title : {
        type : String,
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    status : {
        type : String,
        enum : Object.values(TASK_STATUSES),
        default : TASK_STATUSES.pending
    },
    userId : {
        ref : "User",
        type : ObjectId
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{timestamps:true})

module.exports = mongoose.model('Task',taskSchema)