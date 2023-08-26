const router = require("express").Router();
const { Workout, validate } = require("../models/workout");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		console.log(error)
		const userId = req.user._id; 
		if (error)
			return res.status(400).send({ message: error.details[0].message });

			await new Workout({userId, ...req.body}).save();
        		res.status(201).send({ message: "Workout added successfully" });
	} catch (errors) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {
	try {
	  const userId = req.user._id;
	  const workoutPlans = await Workout.find({ userId: userId });
  
	  if (!workoutPlans || workoutPlans.length === 0) {
		return res.status(404).send({ message: "No workout plans found for the user" });
	  }
  
	  res.status(200).send({ workoutPlans });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });
  

// Delete a workout plan by ID
router.delete('/:id', async (req, res) => {
	try {
	  const workoutId = req.params.id;
	  const userId = req.user._id; // Assuming you're using authentication middleware to get the user ID
  
	  const deletedWorkout = await Workout.findOneAndDelete({
		_id: workoutId,
		userId: userId,
	  });
  
	  if (!deletedWorkout) {
		return res.status(404).send({ message: 'Workout plan not found' });
	  }
  
	  res.status(200).send({ message: 'Workout plan deleted successfully' });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: 'Internal Server Error' });
	}
  });
  router.put("/:id", async (req, res) => {
	try {
	  const userId = req.user._id; 
	  const entryId = req.params.id;
	  const updatedEntry = await Workout.findOneAndUpdate(
		{ _id: entryId, userId: userId },
		{ status: req.body.status }, // Update the status field
		{ new: true }
	  );
  
	  if (!updatedEntry) {
		return res.status(404).send({ message: "Workout entry not found" });
	  }
  
	  res.status(200).send({ message: "Workout entry updated successfully" });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });
  
  
  
module.exports = router;
