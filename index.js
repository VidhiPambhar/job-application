const express = require("express");
const dbConnect = require("./src/db/dbConnect");
const umzug = require("umzug");
const app = express();
require("dotenv").config();
app.use(express.json());



// Stream Routes
const authRoutes = require("./src/routes/authRoutes");
const userDetailRoutes = require("./src/routes/userDetailsRoute");

app.use("/api/auth", authRoutes);
app.use("/api/users", userDetailRoutes);


// Umzug setup for migrations and seeders
// const migrationsPath = "./src/db/migrations";
// const seedersPath = "./src/db/seeders";

// const umzugMigrations = new umzug({
//   migrations: { glob: [migrationsPath, { cwd: __dirname, ignore: '*.gitkeep' }] },
//   context: dbConnect.getQueryInterface(),
//   storage: new umzug.SequelizeStorage({ sequelize: dbConnect }),
//   logger: console,
// });

// const umzugSeeders = new umzug({
//   migrations: { glob: [seedersPath, { cwd: __dirname, ignore: '*.gitkeep' }] },
//   context: dbConnect.getQueryInterface(),
//   storage: new umzug.SequelizeStorage({ sequelize: dbConnect }),
//   logger: console,
// });

// Start the server
const port = 8001;
app.listen(port, async () => {
  console.log("Server is running at port 8000");

  try {
    dbConnect()
    
    // await dbConnect.sync(); // Sync models
    // await umzugMigrations.up(); // Run migrations
    // await umzugSeeders.up();    // Run seeders


    console.log("Models synced, migrations and seeders executed successfully");
  } catch (error) {
    console.error("Error during syncing models, migrations, and seeders:", error);
  }
});
