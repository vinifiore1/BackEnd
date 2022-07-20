const express = require("express");
const router = express.Router();
const controllerUser = require("../controller/user");
const controllerLogin = require("../controller/login");
const { autenticate } = require("../middleware/auth");

router.post("/create/User", controllerUser.createUser);

router.post("/login", controllerLogin.login);
router.get("/login/success", controllerLogin.loginSuccess);
router.get("/login/failure", controllerLogin.loginFailure);

module.exports = router;
