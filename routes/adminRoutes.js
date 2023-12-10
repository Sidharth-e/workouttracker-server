const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const { Workout } = require("../models/workout");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
	console.log(error)
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const records = await User.find();
    res.status(200).send({ data: records, message: "Records" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
router.get("/:date", async (req, res) => {
  try {
    const userId = req.user._id;
    const requestedDate = new Date(req.params.date);
    const workoutPlans = await Workout.find({
      userId: userId,
      date: requestedDate,
    });

    if (!workoutPlans || workoutPlans.length === 0) {
      return res
        .status(404)
        .send({ message: "No workout plans found for the requested date" });
    }

    res.status(200).send({ workoutPlans });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const UserId = req.params.id;
    const userId = req.user._id; // Assuming you're using authentication middleware to get the user ID

    const deletedUser = await User.findOneAndDelete({
      _id: UserId,
      userId: userId,
    });

    if (!deletedUser) {
      return res.status(404).send({ message: "User plan not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user data in req.user
    const entryId = req.params.id;

    // Find the entry by its _id and userId
    const updatedEntry = await User.findOneAndUpdate(
      { _id: entryId, userId: userId },
      req.body, // Update the entry with the data from req.body
      { new: true } // Return the updated entry
    );

    if (!updatedEntry) {
      return res.status(404).send({ message: "User entry not found" });
    }

    res.status(200).send({ message: "User entry updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
module.exports = router;
