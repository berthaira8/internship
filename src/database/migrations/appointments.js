import sequelize from "../../config/db.js";
import Appointment from "../models/appointments.js";

export const createAppointmentsTable = async () => {
  await sequelize.authenticate();
  await Appointment.sync({ alter: true, logging: false });

  console.log("Appointments table created ✅");
};