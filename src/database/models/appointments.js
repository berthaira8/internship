import { DataTypes,Model } from "sequelize";
import sequelize from "../config/db.js";

class Appointment extends Model {}

Appointment.init(
    {
        id: {
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true

        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending"
        }



 
},
{
    sequelize,
    modelName: "Appointment",
    tableName: "appointments",
    timestamps: true
}

);

export default Appointment;
