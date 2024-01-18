const express = require("express");
const dbConnect = require("./src/db/dbConnect");
const cors = require('cors')
const umzug = require("umzug");
const app = express();
require("dotenv").config();
app.use(express.json());

app.use(cors({
  origin:'*'
}))

const authRoutes = require("./src/routes/authRoutes");
const userDetailRoutes = require("./src/routes/userDetailsRoute");

app.use("/api/auth", authRoutes);
app.use("/api/users", userDetailRoutes);


const port = 8001;
app.listen(port, async () => {
  console.log("Server is running at port 8000");

  try {
    dbConnect()
    console.log("Models synced, migrations and seeders executed successfully");
  } catch (error) {
    console.error("Error during syncing models, migrations, and seeders:", error);
  }
});
