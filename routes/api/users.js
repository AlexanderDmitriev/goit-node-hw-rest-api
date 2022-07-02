const express = require("express");
const ctrl = require("../../controllers/users");
const auth = require("../../middlewares/auth");

/* Создаём новую "страницу" в сервере */
const router = express.Router();

router.post("/signup", ctrl.register);
router.post("/login", ctrl.login);
router.get("/logout", auth, ctrl.logout);

module.exports = router;