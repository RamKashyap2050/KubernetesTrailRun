const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const asynchandler = require("express-async-handler");
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    const isPasswordMatch = await bcrypt.compare(password, userExists.password);
    if (isPasswordMatch) {
      const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000), // 1 hour
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "strict",
      });

      res.status(200).json({
        message: "Login successful",
        user: {
          id: userExists.id,
          email: userExists.email,
          user_name: userExists.username,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } else {
    res.status(404).json({ message: "User does not exist" });
  }
});

exports.verifyUser = asynchandler(async (req, res) => {
  console.log("Received cookies:", req.cookies); // Should show the JWT token if sent correctly.
  const token = req.cookies.token; // Access the token stored in cookies

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, { attributes: { exclude: ["password"] } }); // Find user and exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Decoded user:", user);
    res.json({
      message: "User verified",
      user: {
        id: user.id,
        email: user.email,
        user_name: user.username,
      },
    });
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(`Fetching user with ID: ${userId}`);
    
    // Check if the user ID is valid
    if (!userId) {
      console.error('No user ID provided');
      return res.status(400).json({ message: "No user ID provided" });
    }

    // Fetch the user from the database
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'username']
    });

    // Log the user object fetched from the database
    console.log(`User fetched: ${JSON.stringify(user)}`);

    // Handle case where user is not found
    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user data
    res.json(user);
  } catch (error) {
    // Log any errors that occur during the process
    console.error(`Error fetching user with ID ${req.params.id}:`, error.message);
    res.status(500).json({ error: error.message });
  }
};
