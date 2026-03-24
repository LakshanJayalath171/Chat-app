import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getAllMessage, getUsersForSidebar, markMessageAsSeen } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users",protectRoute,getUsersForSidebar);
messageRouter.get("/:id",protectRoute,getAllMessage);
messageRouter.put("/mark/:id",protectRoute,markMessageAsSeen)

export default messageRouter;
