const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");

const PORT = process.env.PORT || 8000;

//update below to match your own MongoDB connection string.
const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("database connection ok");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`listing on port ${PORT}..`);
  });
}
startServer();
