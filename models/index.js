const { Contact, joiSchema } = require("./contact");
const { User, joiRegisterSchema, joiLoginSchema } = require("./user");

module.exports = {
  Contact,
  joiSchema,
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
