import Appointment from "../models/appointments.js";
import User from "../models/users.js";

export const seedAppointments = async () => {
  const doctor = await User.findOne({ where: { fullName: "Shema" } });
  const patient = await User.findOne({ where: { fullName: "Bertha" } });

  if (!doctor || !patient) {
    throw new Error("Doctor or patient not found");
  }

  const appointments = [
    {
      patient_id: patient.id,
      doctor_id: doctor.id,
      appointment_date: "2026-04-10",
      start_time: "10:00",
      end_time: "10:30",
      duration: 30,
      status: "approved",
      reason: "General checkup",
      location: "Clinic A",
      approved_by: doctor.id,
      approved_at: new Date()
    },
    {
      patient_id: patient.id,
      doctor_id: doctor.id,
      appointment_date: "2026-04-11",
      start_time: "11:00",
      end_time: "11:30",
      duration: 30,
      status: "pending",
      reason: "Consultation",
      location: "Clinic B"
    }
  ];

  await Appointment.bulkCreate(appointments);
};