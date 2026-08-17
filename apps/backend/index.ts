import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes"
import workFlowRouter from "./routes/workflow.routes"
import nodeRouter from "./routes/node.routes"
import authorizationMiddleware from "./middleware/auth.middleware";
import { listWorkflows } from "./controllers/workflow.controllers";


const app = express();

if (!process.env.MONGO_URI) {
    throw new Error("Missing required environment variable: MONGO_URI");
}

mongoose.connect(process.env.MONGO_URI).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
});

app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRouter)
app.use("/workflow", workFlowRouter)
app.get("/workflows", authorizationMiddleware, listWorkflows)
app.use("/nodes", nodeRouter)

app.post("/credentials", (req, res) => {
})

app.get("/credentials", (req, res) => {
})

app.listen(process.env.PORT || 3000, () => {
    console.log("backend running on port ", process.env.PORT || 3000)
})
