import { NodeModel } from "db/client";
import { type Request, type Response } from "express";

const listNodes = async (req: Request, res: Response) => {
    try {
        const nodes = await NodeModel.find({});

        return res.status(200).json({
            data: nodes
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export { listNodes };
