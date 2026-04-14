import express from "express";


import { createAppointment,getPatientAppointments,cancelAppointment } from "../controller/appointments.js";

const AppRouter = express.Router();


AppRouter.post("/appointments", createAppointment);
AppRouter.get("/patient-appointments/:patientId", getPatientAppointments);
AppRouter.put("/appointments/cancel/:id", cancelAppointment);

export default AppRouter;