const express = require("express");
const ctrl = require("../../controllers/currentUser");
const auth = require("../../middlewares/auth");

/* Создаём новую "страницу" в сервере */
const router = express.Router();

router.get("/", auth, ctrl.getCurrentUser);
router.patch("/update", auth, ctrl.updateSubscription);

module.exports = router;