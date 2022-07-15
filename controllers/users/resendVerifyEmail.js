const { User, joiEmailSchema } = require("../../models/user");
const { sendEmail } = require("./nodemailer");
const { NotFound, BadRequest } = require("http-errors");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const valideResult = joiEmailSchema.validate(req.body);
    if (valideResult.error) {
      return res.status(400).json({
        status: "missing required field email",
        code: 400,
        message: valideResult.error.message,
      });
    }
    const { email } = req.body;
    const user = User.findOne({ email });
    if (!user) {
      throw NotFound();
    }
    const mail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a target="_blank" href="http://localhost:3000//users/verify/:${user.verificationToken}">Подтвердить email</a>`,
    };
    if (user.verify) {
      throw BadRequest("Verification has already been passed");
    }
    await sendEmail(mail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
