import type {Request,Response} from "express"
import jwt from "jsonwebtoken"

export const login=(req:Request,res:Response)=>{
    const{email, password}=req.body

    if (email =="kavin@gmail.com" && password=="1234") {
        const token=jwt.sign({id:"1",email:email},"secretKey",{expiresIn:"1h"})
         return res.json({
            sucess:true,
            token
        })
    } else {
        return res.status(401).json({
            sucess:false,
            message:"Invalid Credentials"
        })
    }
}

const documents = [{
    id:"D001",
    title:"Introduction to Webtechnologies",
    pages:150
},{
    id:"D002",
    title:"Node JS Fundamentals",
    pages:200
}]

export const getSecretDocuments=(req:Request, res:Response)=>{
    return res.json(documents)
}
