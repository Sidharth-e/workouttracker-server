const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const user = await User.remove({ email: {$ne:"YodaYouhou@gmail.com"}});
		res.status(200).send({ data: "Removed all records", message: "Removed all records" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
module.exports = router;
