import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";

class Appointment extends Model {}

Appointment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    patient_id: {
      type: DataTypes.UUID,
      allowNull: false
    },

    doctor_id: {
      type: DataTypes.UUID,
      allowNull: false
    },

    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    appointment_time: {
      type: DataTypes.TIME,
      allowNull: true
    },

    start_time: {
      type: DataTypes.TIME,
      allowNull: true
    },

    end_time: {
      type: DataTypes.TIME,
      allowNull: true
    },

    duration: {
      type: DataTypes.INTEGER, // in minutes
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "approved",
        "rejected",
        "completed",
        "cancelled"
      ),
      defaultValue: "pending"
    },

    reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    doctor_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    location: {
      type: DataTypes.STRING,
      allowNull: true
    },

    approved_by: {
      type: DataTypes.UUID,
      allowNull: true
    },

    approved_at: {
      type: DataTypes.DATE,
      allowNull: true
    },

    cancelled_by: {
      type: DataTypes.UUID,
      allowNull: true
    },

    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true
    },

    cancellation_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "Appointment",
    tableName: "appointments",
    timestamps: true, 
    underscored: true 
  }
);

export default Appointment;