const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
require("colors");

//mongoDB atlas
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

//server static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`web app listening to port${PORT} `.bgBlue));
