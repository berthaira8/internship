import sequelize from "../../config/db.js";
import Notification from "../models/notification.js";

export const createNotificationsTable = async () => {
  await sequelize.authenticate();
  await Notification.sync({ alter: true, logging: false });

  console.log("Notifications table created ✅");
};