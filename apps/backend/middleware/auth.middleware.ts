import jwt from "jsonwebtoken"
import express from "express"
import { UserModel } from "db/client"
import { ACCESS_TOKEN_SECRET } from "../helper/env"


const authorizationMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({
            message: "Access token not found"
        })
    }
    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as {
            userId: string;
        };

        const User = await UserModel.findById(decoded.userId);
        if (!User) {
            return res.status(403).json({
                message: "Invalid access token"
            })
        }

        req.userId = decoded.userId;

        next();
    } catch (err) {
        console.log(err);

        return res.status(401).json({
            message: "Invalid or expired access token"
        })
    }
}

export default authorizationMiddleware;