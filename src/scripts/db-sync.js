import sequelize from "../config/db.js";
import "../models/index.js";
const syncDatabase=async()=>{
    try {
        console.log("starting database");
        await sequelize.authenticate();
        await sequelize.sync({alter:true});
        process.exit(0)
    } catch (error) {
        process.exit(1)
    }
}
syncDatabase();