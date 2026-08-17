import { Router } from "express";
import authorizationMiddleware from "../middleware/auth.middleware";
import { listNodes } from "../controllers/node.controllers";

const nodeRouter = Router();

nodeRouter.use(authorizationMiddleware);

nodeRouter.get("/", listNodes);

export default nodeRouter;
