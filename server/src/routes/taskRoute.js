const express = require('express')
const router = express.Router()
const taskController = require("../controllers/tasksController")
const { userAuth } = require('../middlewares/userAuth')


router.post('/',userAuth,taskController.createTask)
router.get("/",userAuth,taskController.getAllTask)
router.put("/",userAuth,taskController.updateTask)
router.delete("/",userAuth,taskController.deleteTask)
module.exports = router