const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../middleswares/handleMongooseError");
const { subscrENUM } = require("../constants");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 8,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(subscrENUM),
      default: subscrENUM.STARTER,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

// дані, які приходять з фронтенду для регістрації
const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string().valid(...Object.values(subscrENUM)),
  token: Joi.string(),
});

// дані, які приходять з фронтенду для авторизації
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
