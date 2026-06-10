import express from "express"
import {login,getSecretDocuments} from "../controllers/auth.controller.js"
import {verifyToken} from "../middleware/auth.middleware.js"

const router=express.Router()

router.post("/login",login)
router.get("/documents",verifyToken,getSecretDocuments)

export default router
