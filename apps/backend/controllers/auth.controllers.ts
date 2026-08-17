import { UserModel, RefreshTokenModel } from "db/client"
import { SignUpSchema, LoginSchema } from "common/types"
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { generateAccessToken } from "../helper/auth.helper";
import { generateRefreshToken } from "../helper/auth.helper";
import { REFRESH_TOKEN_SECRET } from "../helper/env";
import { type Request, type Response, } from "express";


const signup = async (req: Request, res: Response) => {
    const { success, data } = SignUpSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid Request"
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
        const user = await UserModel.create({
            username: data.username,
            password: data.password
        })

        const accessToken = generateAccessToken(user.id);

        const { refreshToken, jti } = generateRefreshToken(user.id);


        await RefreshTokenModel.create({
            userId: user._id,
            jti,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            )
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 60 * 1000
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            message: "User created successfully"
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Something went wrong"
        })

    }
}

const login = async (req: Request, res: Response) => {
    const { success, data } = LoginSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid Request"
        })
    }
    try {
        const user = await UserModel.findOne({
            username: data.username,
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            data.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const accessToken = generateAccessToken(user.id);
        const { refreshToken, jti } = generateRefreshToken(user.id);

        await RefreshTokenModel.create({
            userId: user._id,
            jti,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            )
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 60 * 1000
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Login Successfully"
        })

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Something went wrong"
        })
    }

}

const refresh = async (req: Request, res: Response) => {
    const oldRefreshToken =
        req.cookies.refreshToken;

    if (!oldRefreshToken) {
        return res.status(401).json({
            message: "Refresh token not found"
        });
    }

    try {
        const decoded = jwt.verify(
            oldRefreshToken,
            REFRESH_TOKEN_SECRET
        ) as {
            userId: string;
            jti: string;
        };

        const storedToken =
            await RefreshTokenModel.findOne({
                userId: decoded.userId,
                jti: decoded.jti
            });

        if (!storedToken) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        await RefreshTokenModel.deleteOne({
            _id: storedToken._id
        });

        const newAccessToken =
            generateAccessToken(decoded.userId);

        const {
            refreshToken,
            jti: newJti
        } = generateRefreshToken(
            decoded.userId
        );

        await RefreshTokenModel.create({
            userId: decoded.userId,
            jti: newJti,
            expiresAt: new Date(
                Date.now() +
                7 * 24 * 60 * 60 * 1000
            )
        });

        res.cookie(
            "accessToken",
            newAccessToken,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 30 * 60 * 1000
            }
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge:
                    7 * 24 * 60 * 60 * 1000
            }
        );

        return res.status(200).json({
            message: "Token refreshed successfully"
        });

    } catch (err) {
        return res.status(401).json({
            message:
                "Invalid or expired refresh token"
        });
    }
};

const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        try {
            const decoded = jwt.verify(
                refreshToken,
                REFRESH_TOKEN_SECRET
            ) as {
                userId: string,
                jti: string
            }
            await RefreshTokenModel.deleteOne({
                userId: decoded.userId,
                jti: decoded.jti
            })
        } catch (err) {
            // Cookie is invalid/expired — fall through and clear cookies anyway.
        }
    }

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });
};
export { signup, login, refresh, logout };