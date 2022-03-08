import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // stay logged in

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User don't exist" });
    const isPwCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPwCorrect) {
      return res.status(409).json({ message: "Wrong Password" });
    }
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, profile_pic } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Wrong Password" });

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(profile_pic);
    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, profile_pic});
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}