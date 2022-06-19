const express = require("express");
const contactsData = require("../../models/contacts.json");
const operations = require("../../models/contacts");
const Joi = require("joi"); /*  validator */
const validate = require("./validation");

/* Создаём новую "страницу" в сервере */
const router = express.Router();

// validation
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: Joi.string().creditCard().min(10).max(13).required(),
});

router.get("/", async (req, res, next) => {
  const result = await operations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await operations.getContactById(contactId);
  if (!result) {
    res.json({
      status: "error",
      code: 404,
      message: `Not found`,
    });
  }
  res.json({ status: "success", code: 200, data: { result } });
});

router.post("/", async (req, res, next) => {
  const valideResult = schema.validate(req.body);
  if (valideResult.error) {
    return res.json({
      status: "error",
      code: 400,
      message: valideResult.error,
    });
  }
  const result = await operations.addContact(req.body);
  res.json({ status: "success", code: 201, data: { result } });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const removeContact = await operations.removeContact(contactId);
  res.json({
    status: "delete operation was successfully",
    code: 201,
    data: { removeContact },
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const result = contactsData.find(
    (contactItem) => contactItem.id === contactId
  );
  result.name = name;
  result.email = email;
  result.phone = phone;
  res.json({
    status: "edit operation was successfully",
    code: 201,
    data: { result: result },
  });
});

module.exports = router;
