import express from "express";
const NotRouter = express.Router();

import {
  createNotification,
  getAllNotifications,
  getUserNotifications,
  updateNotification,
  deleteNotification
} from "../controller/notifications.js";

NotRouter.post("/notifications", createNotification);
NotRouter.get("/notifications", getAllNotifications);
NotRouter.get("/notifications/:user_id", getUserNotifications);
NotRouter.put("/notifications/:id", updateNotification);
NotRouter.delete("/notifications/:id", deleteNotification);

export default NotRouter;