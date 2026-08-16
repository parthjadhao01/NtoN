import express from "express"
import mongoose from "mongoose"
import { UserModel } from "db/client"

const app = express();
mongoose.connect(process.env.MONGO_URI!);

app.post("/signup",(req,res)=>{
})

app.post("/login",(req,res)=>{
})

app.post("/workflow",(req,res)=>{
})

app.put("/workflow/:workflowId",(req,res)=>{
})

app.get("/workflow/:workflowId",(req,res)=>{
})

app.get("/workflow/executions/:workflowId",(req,res)=>{
})

app.get("/workflows",(req,res)=>{
})

app.post("/credentials",(req,res)=>{
})

app.get("/credentials",(req,res)=>{
})

app.get("/nodes",(req,res)=>{
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("backend running on port ",process.env.PORT || 3000)
})