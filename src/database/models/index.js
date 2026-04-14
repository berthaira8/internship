import sequelize from "../../config/db.js";
import User from "../models/users.js";

const db={
    sequelize, 
    User
}
export default db