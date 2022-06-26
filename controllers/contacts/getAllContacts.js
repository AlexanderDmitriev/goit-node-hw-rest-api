const {Contact} = require('../../models');

const getAllContacts = async (req, res, next) => {
    try {
      const result = await Contact.find({});
      if (!result) {
        const error = new Error("Not found");
        error.status = 404;
        throw error;
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

  module.exports = getAllContacts;