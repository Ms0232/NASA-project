const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanetData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://mayank:5252552@nodeproject.dooc2dw.mongodb.net/Nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("database connection ok");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetData();

  server.listen(PORT, () => {
    console.log(`listing on port ${PORT}..`);
  });
}
startServer();
