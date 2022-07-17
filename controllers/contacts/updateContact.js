const { Contact, joiSchema } = require("../../models");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!req.body) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing fields`,
      });
    }
    const valideResult = joiSchema.validate(req.body);
    if (valideResult.error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: valideResult.error.message,
      });
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body);

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found`,
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
