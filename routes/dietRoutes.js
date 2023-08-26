const router = require("express").Router();
const { Diet, validate } = require("../models/diet");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		console.log(error)
		const userId = req.user._id; 
		if (error)
			return res.status(400).send({ message: error.details[0].message });
        await new Diet({userId, ...req.body}).save();
		res.status(201).send({ message: "Meals created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {
	try {
	  const userId = req.user._id;
	  const meals = await Diet.find({ userId: userId });
  
	  if (!meals || meals.length === 0) {
		return res.status(404).send({ message: "No meals data found for the user" });
	  }
  
	  res.status(200).send({ meals });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

module.exports = router;
