const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removingContact = await Contact.findByIdAndRemove(contactId);
    if (!removingContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found`,
      });
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = updateContact;
