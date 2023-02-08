const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Planet", planetSchema);
