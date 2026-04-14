import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";

class DoctorAvailability extends Model {}

DoctorAvailability.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    doctor_id: {
      type: DataTypes.UUID,
      allowNull: false
    },

    day_of_week: {
      type: DataTypes.ENUM(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ),
      allowNull: false
    },

    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },

    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },

    slot_duration: {
      type: DataTypes.INTEGER, 
      defaultValue: 30
    },

    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: "DoctorAvailability",
    tableName: "doctor_availability",
    timestamps: true,
    underscored: true
  }
);

export default DoctorAvailability;