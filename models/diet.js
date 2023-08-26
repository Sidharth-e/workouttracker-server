// models/diet.js
const mongoose = require("mongoose");
const Joi = require("joi");

const dietSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mealNumber: {
    type: Number,
    required: true,
  },
  consumed: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


const Diet = mongoose.model("Diet", dietSchema);

const validate = (data) => {console.log(data)
  const schema = Joi.object({
    mealNumber: Joi.number().required().label("Amount"),
    consumed:Joi.boolean().required().label("consumed"),
  });
  return schema.validate(data);
};


module.exports = { Diet, validate  };
