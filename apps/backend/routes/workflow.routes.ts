import { Router } from "express";
import authorizationMiddleware from "../middleware/auth.middleware";
import {
    createWorkflow,
    getWorkflow,
    updateWorkflow,
    deleteWorkflow,
    listExecutions
} from "../controllers/workflow.controllers";

const workFlowRouter = Router();

workFlowRouter.use(authorizationMiddleware);

workFlowRouter.post("/", createWorkflow);
workFlowRouter.get("/executions/:workflowId", listExecutions);
workFlowRouter.get("/:workflowId", getWorkflow);
workFlowRouter.put("/:workflowId", updateWorkflow);
workFlowRouter.delete("/:workflowId", deleteWorkflow);

export default workFlowRouter;