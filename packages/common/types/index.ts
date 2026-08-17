import { z } from "zod"

export const SignUpSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(8).max(128)
})

export const LoginSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(8).max(128)
})

export const createAndUpdateWorkflowSchema = z.object({
    nodes: z.array(
        z.object({
            nodeId : z.string().regex(/^[0-9a-f]{24}$/i),
            data : z.object({
                kind : z.enum(["ACTION","TRIGGER"]),
                metadata : z.any()
            }),
            id : z.string(),
            position : z.object({
                x : z.number(),
                y : z.number()
            }),
            credentials : z.any()
        }),
    ),
    edges : z.array(
        z.object({
            id : z.string(),
            source : z.string(),
            target : z.string()
        })
    )
})
