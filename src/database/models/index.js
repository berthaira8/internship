import sequelize from "./src/config/db.js";
import User from "./users.js";

const db={
    sequelize, 
    User
}
export default db