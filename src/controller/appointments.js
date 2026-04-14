import Appointment from "../database/models/appointments.js";
import Notification from "../database/models/notification.js";



export const createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date } = req.body;

    const appointment = await Appointment.create({
      patient_id,
      doctor_id,
      appointment_date
    });

    // 🔔 notify doctor
    await Notification.create({
      user_id: doctor_id,
      type: "appointment_created",
      message: "New appointment request",
      title: "New Appointment",
      status: "unread"
    });

    res.status(201).json(appointment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getPatientAppointments = async (req, res) => {
  try {
    const { patient_id } = req.params;

    const appointments = await Appointment.findAll({
      where: { patient_id: patient_id } // ✅ FIXED
    });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctor_id } = req.params;

    const appointments = await Appointment.findAll({
      where: { doctor_id: doctor_id }
    });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const confirmAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ✅ update status
    appointment.status = "confirmed";
    await appointment.save();

    // ✅ create notification automatically
    await Notification.create({
      user_id: appointment.patient_id,
      type: "appointment",
      message: "Your appointment has been confirmed",
      title: "Appointment Confirmed"
    });

    res.json({ message: "Appointment confirmed ✅" });

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
      user_id: appointment.patient_id, 
      type: "appointment_cancelled",
      message: `Appointment cancelled: ${reason}`,
      status: "unread"
    });

    res.json({ message: "Cancelled successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};