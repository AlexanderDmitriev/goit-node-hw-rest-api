const express = require("express");
const ctrl = require("../../controllers/users");

/* Создаём новую "страницу" в сервере */
const router = express.Router();

router.post("/signup", ctrl.register);

module.exports = router;