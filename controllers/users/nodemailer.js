const nodemailer = require("nodemailer");
require("dotenv").config();
const { META_PASSWORD } = process.env;

const nodemailerconfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "alex9110077@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerconfig);
/* const email = {
  to: "some@mail.com",
  from: "alex9110077@meta.ua",
  subject: "test mail",
  html: "<p>TEST</p>",
}; */

const sendEmail = async (data) => {
  const email = { ...data, from: "alex9110077@meta.ua" };
  await transporter
    .sendMail(email)
    .then(() => {
      console.log("Mail has been sended");
    })
    .catch((error) => console.log(error.message));
};

module.exports = { sendEmail };
