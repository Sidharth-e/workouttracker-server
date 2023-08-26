// models/watertracker.js
const mongoose = require("mongoose");
const Joi = require("joi");

const waterintakeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});


const WaterIntake = mongoose.model("WaterIntake", waterintakeSchema);

const validate = (data) => {
  const schema = Joi.object({
    amount: Joi.number().required().label("Amount")
  });
  return schema.validate(data);
};


module.exports = { WaterIntake, validate  };
