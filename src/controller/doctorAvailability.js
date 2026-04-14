import DoctorAvailability from "../database/models/doctorAvailability.js";

// CREATE availability
export const createAvailability = async (req, res) => {
  try {
    const { doctor_id, day_of_week, start_time, end_time } = req.body;

    const availability = await DoctorAvailability.create({
      doctor_id,
      day_of_week,
      start_time,
      end_time
    });

    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all availability
export const getAllAvailability = async (req, res) => {
  try {
    const data = await DoctorAvailability.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET availability by doctor
export const getDoctorAvailability = async (req, res) => {
  try {
    const { doctor_id } = req.params;

    const data = await DoctorAvailability.findAll({
      where: { doctor_id }
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE availability
export const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    const availability = await DoctorAvailability.findByPk(id);

    if (!availability) {
      return res.status(404).json({ message: "Not found" });
    }

    await availability.update(req.body);

    res.json({ message: "Updated successfully", availability });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE availability
export const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    const availability = await DoctorAvailability.findByPk(id);

    if (!availability) {
      return res.status(404).json({ message: "Not found" });
    }

    await availability.destroy();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};