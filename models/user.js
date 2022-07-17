const { Schema, model } = require("mongoose");
const Joi = require("joi"); /*  validator */

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL:{
      type:String,
      required: true
    }
    
  },
  { versionKey: false, timestamps: true }
);

// validation
const joiRegisterSchema = Joi.object({
    password: Joi.string().alphanum().min(6).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
      })
      .required(),
      subscription: Joi.string().required()
  });

  const joiLoginSchema = Joi.object({
    password: Joi.string().alphanum().min(6).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
      })
      .required(),
  });

  const User = model("user",userSchema);

  module.exports = {User, joiRegisterSchema,joiLoginSchema}
