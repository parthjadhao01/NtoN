import { WorkflowModel, ExecutionModel } from "db/client";
import { createAndUpdateWorkflowSchema } from "common/types";
import { type Request, type Response } from "express";

const isCastError = (err: unknown): boolean =>
    !!err && typeof err === "object" && "name" in err && err.name === "CastError";

const createWorkflow = async (req: Request, res: Response) => {
    const { success, data } = createAndUpdateWorkflowSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid workflow"
        });
    }

    try {
        const workflow = await WorkflowModel.create({
            userId: req.userId,
            nodes: data.nodes,
            edges: data.edges
        });

        return res.status(201).json({
            message: "Workflow created successfully",
            data: workflow.id
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const listWorkflows = async (req: Request, res: Response) => {
    try {
        const workflows = await WorkflowModel.find({ userId: req.userId });

        return res.status(200).json({
            data: workflows
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getWorkflow = async (req: Request, res: Response) => {
    try {
        const workflow = await WorkflowModel.findOne({
            _id: req.params.workflowId,
            userId: req.userId
        });

        if (!workflow) {
            return res.status(404).json({
                message: "Workflow not found"
            });
        }

        return res.status(200).json({
            data: workflow
        });
    } catch (err) {
        if (isCastError(err)) {
            return res.status(400).json({
                message: "Invalid workflow id"
            });
        }

        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateWorkflow = async (req: Request, res: Response) => {
    const { success, data } = createAndUpdateWorkflowSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid workflow"
        });
    }

    try {
        const workflow = await WorkflowModel.findOneAndUpdate(
            {
                _id: req.params.workflowId,
                userId: req.userId
            },
            {
                nodes: data.nodes,
                edges: data.edges
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!workflow) {
            return res.status(404).json({
                message: "Workflow not found"
            });
        }

        return res.status(200).json({
            message: "Workflow updated successfully",
            data: workflow
        });
    } catch (err) {
        if (isCastError(err)) {
            return res.status(400).json({
                message: "Invalid workflow id"
            });
        }

        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deleteWorkflow = async (req: Request, res: Response) => {
    try {
        const workflow = await WorkflowModel.findOneAndDelete({
            _id: req.params.workflowId,
            userId: req.userId
        });

        if (!workflow) {
            return res.status(404).json({
                message: "Workflow not found"
            });
        }

        return res.status(200).json({
            message: "Workflow deleted successfully"
        });
    } catch (err) {
        if (isCastError(err)) {
            return res.status(400).json({
                message: "Invalid workflow id"
            });
        }

        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const listExecutions = async (req: Request, res: Response) => {
    try {
        const workflow = await WorkflowModel.findOne({
            _id: req.params.workflowId,
            userId: req.userId
        });

        if (!workflow) {
            return res.status(404).json({
                message: "Workflow not found"
            });
        }

        const executions = await ExecutionModel.find({ workflowId: workflow._id });

        return res.status(200).json({
            data: executions
        });
    } catch (err) {
        if (isCastError(err)) {
            return res.status(400).json({
                message: "Invalid workflow id"
            });
        }

        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export {
    createWorkflow,
    listWorkflows,
    getWorkflow,
    updateWorkflow,
    deleteWorkflow,
    listExecutions
};
