const express = require("express");
const ctrl = require("../../controllers/users");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

/* Создаём новую "страницу" в сервере */
const router = express.Router();

router.post("/signup", ctrl.register);
router.post("/login", ctrl.login);
router.get("/logout", auth, ctrl.logout);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;