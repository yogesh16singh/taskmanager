const taskModel = require("../models/taskModel")
const { TASK_STATUSES } = require("../utils/constants")

exports.createTask = async(bodyData,userData)=>{
    const {title='', description=''} = bodyData || {}
    const {userId} = userData || {}
    const task = await taskModel.create({
        ...(title && {title}),
        ...(description && {description}),
        userId
    })
    return {
        status : true,
        code : 201,
        data : task
    }
}

exports.getAllTasks = async(userData,query,sortBy)=>{
    const {userId} = userData || {}
    const tasks = await taskModel.find({
        isDeleted : false,
        userId,
        ...(query && {$or : [
            {
                title: { $regex: query, $options: 'i' } 
              },
              {
                description: { $regex: query, $options: 'i' } 
              }
        ]})
    }).sort({
        createdAt : sortBy == 'ascending' ? 1 : -1
        
    })

    const pending = []
    const completed = []
    const inProgress = []
    tasks.forEach(task=>{
        if(task.status == TASK_STATUSES.pending){
            pending.push(task)
            return
        }
        if(task.status == TASK_STATUSES.inProgress){
            inProgress.push(task)
            return
        }
        if(task.status == TASK_STATUSES.completed){
            completed.push(task)
            return
        }
    })
    return {
        status : true,
        code : 200,
        data : {
            pending,completed,inProgress
        }
    }
}

exports.updateTask = async(bodyData,userData)=>{
    const {title, description, _id,status} = bodyData || {}
    const {userId} = userData || {}

    const updatedTask = await taskModel.findOneAndUpdate({
        isDeleted : false,
        _id,
        userId
    },{
        $set : {
            title,
            description,
            status
        }
    },{new : true})

    if(!updatedTask){
        return {
            status : false,
            code : 404,
            message : 'Task not found'
        }
    }

    return {
        status : true,
        code : 200,
        message : 'Task updated successfully',
        data : updatedTask
    }
}

exports.deleteTask = async(bodyData,userData)=>{
    const {userId} = userData || {}
    const {taskId} = bodyData || {}
    const task = await taskModel.findOneAndUpdate({
        _id : taskId,
        isDeleted : false,
        userId
    },{
        $set : {
            isDeleted : true
        }
    },{
        new : true
    })

    if(!task){
        return {
            status : false,
            code : 404,
            message : 'Task not found'
        }
    }

    return {
        status : true,
        code : 200,
        message : 'Task deleted successfully',
        data : task
    }
}