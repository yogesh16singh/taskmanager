const { app } = require("./server");

// app.use("/",(req,res)=> res.status(200).send("Server is running"))
app.use("/user",require("./routes/userRoute"))
app.use('/task',require("./routes/taskRoute"))

module.exports = app