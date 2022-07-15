const { User, joiRegisterSchema } = require("../../models/user");
const { Conflict } = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { sendEmail } = require("./nodemailer");

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
    const verificationToken = uuidv4();
    const { email, password, subscription } = req.body;
    const avatarURL = gravatar.url(email);
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a target="_blank" href="http://localhost:3000//users/verify/:${verificationToken}">Подтвердить email</a>`,
    };
    await sendEmail(mail);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { user: { email, subscription, avatarURL, verificationToken } },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
