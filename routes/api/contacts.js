const express = require("express");
const { v4: uuidv4 } = require("uuid");
const prevRes = require("../../models/contacts.json");

/* Создаём новую "страницу" в сервере */
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: { result: prevRes },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = prevRes.find((contactItem) => contactItem.id === contactId);
  if (!result) {
    res.json({
      status: "error",
      code: 404,
      message: `Contact with id = ${contactId} not found`,
    });
  }
  res.json({ status: "success", code: 200, data: { result: result } });
});

router.post("/", async (req, res, next) => {
  const newContact = { ...req.body, id: uuidv4() };
  prevRes.push(newContact);
  res.json({ status: "adding", code: 201, data: { result: newContact } });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
