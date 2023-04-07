if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// instantiate express app and provide layout configuration
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");

// set up view engine and use them
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// set up MongoDB server
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// listen on port 3000 and set up routes
app.listen(process.env.PORT || 3000);
app.use("/", indexRouter);
