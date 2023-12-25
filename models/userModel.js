const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Scheme = mongoose.Schema;

const userSchema = new Scheme({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
});

// set up a static method to handle user signup
userSchema.statics.signup = async function (email, password, username) {
  // validation
  if (!email || !password || !username) {
    throw Error("Missing email or password or username");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol"
    );
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    username,
  });

  return user;
};
// varun gandu
// static login method

userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("Missing email or password");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email does not exist");
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
