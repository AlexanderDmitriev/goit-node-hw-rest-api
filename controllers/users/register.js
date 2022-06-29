const { User, joiRegisterSchema } = require("../../models/user");
const { Conflict } = require("http-errors");

const register = async (req, res, next) => {
  try {
    const valideResult = joiRegisterSchema.validate(req.body);
    if (valideResult.error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: valideResult.error.message,
      });
    }
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("409 error");
    }
    await User.create({ email, password, subscription });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { user: { email, subscription } },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
