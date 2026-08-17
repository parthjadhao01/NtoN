import { z } from "zod"

export const SignUpSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(8).max(128)
})

export const LoginSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(8).max(128)
})