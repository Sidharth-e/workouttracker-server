const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const records = await User.find();
		res.status(200).send({ data: records, message: "Records" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
module.exports = router;
