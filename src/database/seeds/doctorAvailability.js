import DoctorAvailability from "../models/doctorAvailability.js";
import User from "../models/users.js";

export const seedDoctorAvailability = async () => {
  const doctor = await User.findOne({ where: { fullName: "Shema" } });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const availability = [
    {
      doctor_id: doctor.id,
      day_of_week: "Monday",
      start_time: "09:00",
      end_time: "17:00",
      slot_duration: 30
    },
    {
      doctor_id: doctor.id,
      day_of_week: "Wednesday",
      start_time: "10:00",
      end_time: "15:00",
      slot_duration: 30
    }
  ];

  await DoctorAvailability.bulkCreate(availability);
};