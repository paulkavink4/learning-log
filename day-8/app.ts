import express from "express"
import type { Request, Response, NextFunction } from "express"
import  authRoutes from "./routes/auth.routes.js" // authRoutes a random name given by us, since it is a default export
import {verifyToken} from "./middleware/auth.middleware.js"
const app= express()
const PORT=5000

app.use(express.json())

app.get("/health",(req:Request,res:Response)=>{
    res.send("Working")
})
app.use("/auth",authRoutes)
app.use("/",authRoutes)

app.listen(PORT,()=>{
    console.log("Server Running..");
})
