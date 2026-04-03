import express from "express";
import sequelize from "./src/config/db.js";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 5000;

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