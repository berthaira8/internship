import express from "express";
import { createAvailability,getAllAvailability,getDoctorAvailability,updateAvailability,deleteAvailability} from "../controller/doctorAvailability.js";

const DoctRouter = express.Router();

DoctRouter.post("/availability", createAvailability);
DoctRouter.get("/availability", getAllAvailability);
DoctRouter.get("/availability/:doctor_id", getDoctorAvailability);
DoctRouter.put("/availability/:id", updateAvailability);
DoctRouter.delete("/availability/:id", deleteAvailability);

export default DoctRouter;
