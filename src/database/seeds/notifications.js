import Notification from "../models/notification.js";
import User from "../models/users.js";
import Appointment from "../models/appointments.js";

export const seedNotifications = async () => {
  const patient = await User.findOne({ where: { fullName: "Bertha" } });
  const doctor = await User.findOne({ where: { fullName: "Shema" } });

  const appointment = await Appointment.findOne();

  if (!patient || !doctor || !appointment) {
    throw new Error("Missing required data");
  }

  const notifications = [
    {
      user_id: patient.id,
      title: "Appointment Approved",
      message: "Your appointment has been approved",
      type: "appointment_approved",
      related_id: appointment.id
    },
    {
      user_id: doctor.id,
      title: "New Appointment",
      message: "You have a new appointment scheduled",
      type: "appointment_created",
      related_id: appointment.id
    }
  ];

  await Notification.bulkCreate(notifications);
};