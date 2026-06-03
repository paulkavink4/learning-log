
const express = require("express")
const {Worker} = require("worker_threads")
const app = express()
const port = process.env.PORT || 3000 
/**
 * process.env.PORT - Dynamic Configuration: It allows applications to run on different ports in different environments (e.g., development, staging, production) without hardcoding values. Cloud providers like Heroku and AWS automatically set this variable to assign a specific port to the application. 
Fallback Pattern: Developers typically use the pattern const port = process.env.PORT || 3000; to ensure the server defaults to port 3000 locally if the environment variable is undefined, while respecting the cloud provider's assigned port during deployment. 
Implementation: It is accessed via the global process.env object, which contains all user environment variables available to the Node.js process at runtime. 
 */

app.get("/non-blocking",(req,res)=>{
    res.status(200)
    res.send("This page is non- blocking")
})

app.get("/blocking",(req,res)=>{
    const worker = new Worker("./worker.js ")
    worker.on("message",(data)=>{
        res.status(200).send(`Result is ${data}`)
    })
    worker.on("error",err =>{
        res.status(400).send(`An error occured ${err}`)
    })
})

app.listen(port,()=>{
    console.log(`Server Started:${port}`);
    
})
