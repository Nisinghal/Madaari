const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const PORT = process.env.PORT || 4242;

app.use(express.urlencoded({ extended: false }));

//Session
app.use(
  session({
    secret: "madaari",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.message = req.flash("message");
  res.locals.error = req.flash("error");
  next();
});

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use("/", require("./routes/index"));

app.use("/", express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
