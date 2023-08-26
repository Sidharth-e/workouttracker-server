// models/workout.js
const mongoose = require("mongoose");
const Joi = require("joi");

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  instructions: { type: String, required: true },
  difficulty: { type: String, required: true },
  equipment: { type: String, required: true },
  muscle: { type: String, required: true },
  reps: { type: String, required: true },
  sets: { type: String, required: true },
  type: { type: String, required: true },
  status:{type:String,required:false,default:"pending"}
});


const Workout = mongoose.model("Workout", workoutSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    instructions: Joi.string().required().label("instructions"),
    difficulty: Joi.string().required().label("difficulty"),
    equipment: Joi.string().required().label("equipment"),
    muscle: Joi.string().required().label("muscle"),
    reps: Joi.string().required().label("reps"),
    sets: Joi.string().required().label("sets"),
    type: Joi.string().required().label("type"),

  });
  return schema.validate(data);
};


module.exports = { Workout, validate  };
