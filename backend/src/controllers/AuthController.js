const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//dangki
const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      JSON.stringify(req.body.password),
      "1234"
    ).toString(),
  });
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.send("email da ton tai");
    }

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//dangnhap
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json("tai khoan khong ton tai");

    const bytes = CryptoJS.AES.decrypt(user.password, "1234");
    const originalPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "1234",
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    if (originalPassword !== req.body.password)
      return res.status(401).json("sai mat khau");

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  register,
  login,
};
