const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	gender: { type: String, required: true },
	age: { type: String, required: true },
	height: { type: String, required: true },
	weight: { type: String, required: true },
	email: { type: String, required: true },
	healthGoal: { type: String, required: true },
	activityLevel: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		gender: Joi.string().required().label("gender"),
		age: Joi.string().required().label("age"),
		height: Joi.string().required().label("Height"),
		weight: Joi.string().required().label("Weight"),
		healthGoal: Joi.string().required().label("healthGoal"),
		activityLevel: Joi.string().required().label("activityLevel"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
