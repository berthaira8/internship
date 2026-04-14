import Notification from "../database/models/notification.js";

// CREATE notification
export const createNotification = async (req, res) => {
  try {
    const { user_id, type, message, title } = req.body;

    const notification = await Notification.create({
      user_id,
      type,
      message,
      title
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET notifications for one user
export const getUserNotifications = async (req, res) => {
  try {
    const { user_id } = req.params;

    const notifications = await Notification.findAll({
      where: { user_id }
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE (mark as read for example)
export const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: "Not found" });
    }

    await notification.update(req.body);

    res.json({ message: "Updated", notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: "Not found" });
    }

    await notification.destroy();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};