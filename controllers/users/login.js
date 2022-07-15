const { User, joiLoginSchema } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Импорт параметра из переменных окружения
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const valideResult = joiLoginSchema.validate(req.body);
    if (valideResult.error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: valideResult.error.message,
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!user || !user.verify || !passCompare) {
      throw new Unauthorized("Email or password of verify is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
