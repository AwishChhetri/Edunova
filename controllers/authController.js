const { z } = require('zod');

const userValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});



const User = require('../models/User');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const validatedData = userValidationSchema.parse(req.body);

    const user = new User(validatedData);
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = userValidationSchema.parse(req.body);
    console.log(req.body)
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

