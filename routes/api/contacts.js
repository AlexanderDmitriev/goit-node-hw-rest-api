const express = require("express");
const ctrl = require("../../controllers/contacts");
const auth = require("../../middlewares/auth");

/* Создаём новую "страницу" в сервере */
const router = express.Router();

router.get("/", auth, ctrl.getAllContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", auth,  ctrl.addContact);

router.put("/:contactId", ctrl.updateContact);

router.delete("/:contactId", ctrl.deleteContact);

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;
