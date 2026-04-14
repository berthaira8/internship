import Appointment from "../database/models/appointments.js";
import Notification from "../database/models/notification.js";



export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date } = req.body;

    const appointment = await Appointment.create({
      patient_id: patientId,
      doctor_id: doctorId,
      appointment_date: date
    });

    // ✅ CREATE NOTIFICATION FOR DOCTOR
    await Notification.create({
      user_id: doctorId, // who receives notification
      type: "appointment_request",
      message: "You have a new appointment request",
      status: "unread"
    });

    res.status(201).json(appointment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await Appointment.findAll({
      where: { patient_id: patientId } // ✅ FIXED
    });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    appointment.status = "cancelled";
    appointment.cancelReason = reason;
    await appointment.save();

    // ✅ FIXED NOTIFICATION
    await Notification.create({
      user_id: appointment.patient_id, // correct field
      type: "appointment_cancelled",
      message: `Appointment cancelled: ${reason}`,
      status: "unread"
    });

    res.json({ message: "Cancelled successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};