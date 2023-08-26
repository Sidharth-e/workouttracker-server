const router = require("express").Router();
const { WaterIntake, validate } = require("../models/watertracker");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		const userId = req.user._id; 
		if (error)
			return res.status(400).send({ message: error.details[0].message });

	await new WaterIntake({userId, ...req.body}).save();
        res.status(201).send({ message: "WaterIntake added successfully" });
	} catch (errors) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}); 

router.get("/", async (req, res) => {
	try {
	  const userId = req.user._id;
	  const today = new Date();
	  today.setHours(0, 0, 0, 0);
  
	  const waterIntakeToday = await WaterIntake.find({
		userId: userId,
		date: { $gte: today },
	  });
  
	  if (!waterIntakeToday || waterIntakeToday.length === 0) {
		return res.status(404).send({ message: "No water intake data found for today" });
	  }
  
	  res.status(200).send({ waterIntakeToday });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });
  router.delete("/:id", async (req, res) => {
	try {
	  const userId = req.user._id;
	  const entryId = req.params.id;
  
	  const deletedEntry = await WaterIntake.findOneAndDelete({
		_id: entryId,
		userId: userId,
	  });
  
	  if (!deletedEntry) {
		return res.status(404).send({ message: "Water intake entry not found" });
	  }
  
	  res.status(200).send({ message: "Water intake entry deleted successfully" });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });
  router.put("/:id", async (req, res) => {
	try {
	  const userId = req.user._id;
	  const entryId = req.params.id;
  
	//   const { error } = validate(req.body);
	//   if (error) {
	// 	return res.status(400).send({ message: error.details[0].message });
	//   }
  
	  const updatedEntry = await WaterIntake.findOneAndUpdate(
		{ _id: entryId, userId: userId },
		req.body,
		{ new: true }
	  );
  
	  if (!updatedEntry) {
		return res.status(404).send({ message: "Water intake entry not found" });
	  }
  
	  res.status(200).send({ message: "Water intake entry updated successfully" });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });
	

module.exports = router;
