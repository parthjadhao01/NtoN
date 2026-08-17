import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./env";

export const generateAccessToken = (userId: string) => {
    return jwt.sign(
        { userId },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: "30m"
        }
    );
};

export const generateRefreshToken = (userId: string) => {
    const jti = crypto.randomUUID();

    const refreshToken = jwt.sign(
        {
            userId,
            jti
        },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return {
        refreshToken,
        jti
    };
};