const express = require("express");
const app = express();
const router = require("./router/router");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./config/auth")(passport);

app.use(cors());

app.use(express.json());
app.use(passport.initialize());
app.use(
  session({
    secret: "passportLogin",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(router);

app.listen(3030, (req, res) => {
  console.log("SERVIDOR RODANDO NA PORTA 3030");
});
