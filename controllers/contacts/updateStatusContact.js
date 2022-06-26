const { Contact } = require("../../models");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (!req.body) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing field favorite`,
      });
    }
    const result = await Contact.findByIdAndUpdate(contactId, { favorite });

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

module.exports = updateStatusContact;
