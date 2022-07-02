const { Schema, model,SchemaTypes } = require("mongoose");
const Joi = require("joi"); /*  validator */

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner:{
      type: SchemaTypes.ObjectId,
      ref: 'user'
    },
  },
  { versionKey: false, timestamps: true }
);

// validation
const joiSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
      })
      .required(),
    phone: Joi.string().min(10).max(30).required(),
    favorite:Joi.bool()
  });

const Contact = model("contact", contactSchema);

module.exports = { Contact,joiSchema };
