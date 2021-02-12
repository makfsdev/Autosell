const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();
const path = require("path");

// import routes
// const authRoutes = require('./routes/auth')

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

//routes middleware
// app.use('/api', authRoutes);

//requiring all route as prefix
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// Serve static

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
