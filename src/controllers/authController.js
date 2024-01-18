const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { Roles } = require("../models/jobProfile.model");

// Login API
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists with the provided email
    const user = await Roles.findOne({
      where: {
        [Op.and]: [{ email: email }, { password: password }],
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    

    req.user = {user: user.slug}

    console.log(req.user,'req.userreq.user');

    const token = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );

    // Check if the user has the admin role based on the slug
    if (user.slug !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // If all checks pass, return a successful response
    return res.json({ status: true, message: "Login successful",token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Logout API
exports.logout = async (req, res) => {
  try {
    // You may also have a blacklist mechanism to invalidate the token or session

    // For demonstration, let's assume you're using JWT and clearing the token
    res.clearCookie('token');  // Clear the token cookie

    return res.json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
