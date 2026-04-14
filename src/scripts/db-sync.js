import sequelize from "../config/db.js";
import "../database/index.js";
import { seedUsers } from "../database/seeds/users.js";
import { seedDoctorAvailability } from "../database/seeds/doctorAvailability.js";
import { seedAppointments } from "../database/seeds/appointments.js";
import { seedNotifications } from "../database/seeds/notifications.js";


import { createUserTable } from "../database/migrations/users.js";
import { createDoctorAvailabilityTable } from "../database/migrations/doctorAvailability.js";
import { createAppointmentsTable } from "../database/migrations/appointments.js";
import { createNotificationsTable } from "../database/migrations/notifications.js";



const syncDatabase = async () => {
  try {
    console.log("🚀 Starting database...");
    
    await sequelize.authenticate();
    console.log("Database connection established successfully 🔥🔥🔥🔥");
    await createUserTable();
    await createAppointmentsTable();
    await createDoctorAvailabilityTable();
    await createNotificationsTable();
    await sequelize.sync({alter:true,logging:false});
    
    await seedDoctorAvailability();
    await seedAppointments();
    await seedNotifications();

    console.log("Database synced successfully 🔥🔥🔥🔥🔥");

    process.exit(0);
  } catch (error) {
    console.error("Database sync failed:", error);
    process.exit(1);
  }
};

syncDatabase();