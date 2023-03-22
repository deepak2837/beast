var  express = require("express")
var k = express()



k.get("/",(req,res)=>{res.send("hi")})
console.log("hi")
k.listen(port = 8080)