const express = require("express");
const ctrl = require("../../controllers/contacts");

/* Создаём новую "страницу" в сервере */
const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addContact);

router.put("/:contactId", ctrl.updateContact);

router.delete("/:contactId", ctrl.deleteContact);

router.patch("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;
