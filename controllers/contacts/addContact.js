const { Contact,joiSchema } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const valideResult = joiSchema.validate(req.body);
    if (valideResult.error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: valideResult.error.message,
      });
    }
    const result = await Contact.create({...req.body, owner: _id});
    res.json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
