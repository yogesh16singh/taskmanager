
const mongoose = require("mongoose")
    require ("dotenv").config({
        path:`.env`
    })


require("./expressServer")

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGO_URL:", process.env.MONGO_URL);


console.log(process.env.NODE_ENV, process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true })
.then(()=>console.log("MongoDb running"))
.catch((error)=>console.log("Failed to connect to MongoDB",error))

module.exports = require("./expressServer");
