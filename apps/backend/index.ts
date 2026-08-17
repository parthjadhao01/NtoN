import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes"


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
app.use("/auth",authRouter)


app.post("/workflow", (req, res) => {
})

app.put("/workflow/:workflowId", (req, res) => {
})

app.get("/workflow/:workflowId", (req, res) => {
})

app.get("/workflow/executions/:workflowId", (req, res) => {
})

app.get("/workflows", (req, res) => {
})

app.post("/credentials", (req, res) => {
})

app.get("/credentials", (req, res) => {
})

app.get("/nodes", (req, res) => {
})

app.listen(process.env.PORT || 3000, () => {
    console.log("backend running on port ", process.env.PORT || 3000)
})