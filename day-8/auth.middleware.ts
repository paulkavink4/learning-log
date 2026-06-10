import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
//Next funcyion next() is used to next handler after its work done
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader=req.headers.authorization as string

    if (authHeader) {
        const token = authHeader.split(" ")[1]

        try {
            jwt.verify(
                token as string,
                "secretKey"
            )
            next()
        } catch (error) {
            return res.status(401).json({
                message:"Ivalid Token"
            })
        }
    }else{
        return res.status(404).json({
            message:"Token Missing"
        })
    }
};
