import express from "express";


import { createAppointment,getPatientAppointments,getDoctorAppointments,cancelAppointment,confirmAppointment } from "../controller/appointments.js";

const AppRouter = express.Router();


AppRouter.post("/appointments", createAppointment);
AppRouter.get("/patient-appointments/:patient_id", getPatientAppointments);
AppRouter.get("/doctor-appointments/:doctor_id", getDoctorAppointments);
AppRouter.put("/appointments/cancel/:id", cancelAppointment);
AppRouter.put("/appointments/confirm/:id", confirmAppointment);

export default AppRouter;