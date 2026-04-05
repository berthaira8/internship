import sequelize from "./src/config/db.js";
import User from "../models/users.js";

export const createdUserTable=async()=>{
    await sequelize.authenticate();
    await User.sync({alter:true});
    console.log("Table created successfully 🔥🔥🔥🔥🔥🔥🔥");
}