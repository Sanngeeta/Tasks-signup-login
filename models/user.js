const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/taskDb", { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Connection failed", err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

User = mongoose.model("user", userSchema);
module.exports = { User };
