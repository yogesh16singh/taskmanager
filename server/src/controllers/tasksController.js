const taskService = require('../services/tasksService')

exports.createTask = async(req,res)=>{
    try{
        const {status,data,code,message} = await taskService.createTask(req.body,req.user)
        return res.status(code ||200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while creating task : `,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while creating task : ${error.message}`
        })
    }
}

exports.getAllTask = async(req,res)=>{
    try{
        const {search = '',sortBy=''} = req.query || {}
        const {status,data,code,message} = await taskService.getAllTasks(req.user,search,sortBy)
        return res.status(code ||200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while fetching all task : `,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while fetching all task : ${error.message}`
        })
    }
}

exports.updateTask = async(req,res)=>{
    try{
        const {status,data,code,message} = await taskService.updateTask(req.body,req.user)
        return res.status(code ||200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while updating task : `,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while updating task : ${error.message}`
        })
    }
}

exports.deleteTask = async(req,res)=>{
    try{
        const {status,data,code,message} = await taskService.deleteTask(req.body,req.user)
        return res.status(code ||200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while deleting task : `,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while deleting task : ${error.message}`
        })
    }
}