import express from "express";
import sequelize from "./src/config/db.js";
import "dotenv/config";
import router from "./src/routes/users.js";
import AuthRouter from "./src/routes/auth.js";
import AppRouter from "./src/routes/appointments.js";
import DoctRouter from "./src/routes/doctorAvailability.js";
import NotRouter from "./src/routes/notifications.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(router); 
app.use(AuthRouter);
app.use(AppRouter);
app.use(DoctRouter);
app.use(NotRouter);
sequelize.authenticate()
  .then(() => {
    console.log("Database connected");

    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Your Database is running 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });