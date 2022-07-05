const express = require("express");
const ctrl = require("../../controllers/currentUser");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

/* Создаём новую "страницу" в сервере */
const router = express.Router();

router.get("/", auth, ctrl.getCurrentUser);
router.patch("/update", auth, ctrl.updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;