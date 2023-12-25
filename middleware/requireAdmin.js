const User = require("../models/userModel");
const requireAdmin = async (req, res, next) => {
  // verify the role of the user

  try {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({ error: "request role is not authorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "request role is not authorized" });
  }
};

module.exports = requireAdmin;
// varun gandu
