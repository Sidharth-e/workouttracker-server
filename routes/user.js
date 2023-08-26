const router = require("express").Router();
const { User, validate } = require("../models/user");

router.get("/", async (req, res) => {
	try {
	    const userId = req.user._id;
		const Userdetails = await User.find({ _id: userId });
		if (!Userdetails || Userdetails.length === 0) {
			return res.status(404).send({ message: "No user found" });
		  }
		res.status(201).send({Userdetails});
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
