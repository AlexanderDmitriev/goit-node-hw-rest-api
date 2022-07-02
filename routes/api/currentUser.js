const express = require("express");
const ctrl = require("../../controllers/currentUser");
const auth = require("../../middlewares/auth");

/* Создаём новую "страницу" в сервере */
const router = express.Router();

router.get("/current", auth, ctrl.getCurrentUser);

module.exports = router;