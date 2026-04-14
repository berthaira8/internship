import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";

class Notification extends Model {}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },

    title: {
      type: DataTypes.STRING,
      allowNull: true
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    type: {
      type: DataTypes.ENUM(
        "appointment_created",
        "appointment_approved",
        "appointment_rejected",
        "appointment_cancelled",
        "reminder"
      ),
      allowNull: false
    },

    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    related_id: {
      type: DataTypes.UUID,
      allowNull: true 
    }
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notifications",
    timestamps: true,
    underscored: true
  }
);

export default Notification;