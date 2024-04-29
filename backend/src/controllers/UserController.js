const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const { register } = require("./AuthController");

//cap nhat nguoi dung
const UpdateUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        JSON.stringify(req.body.password),
        "1234"
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("chi co the cap nhat tai khoan cua minh");
  }
};

//xoa nguoi dung
const DeleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("chi co the xoa tai khoan cua minh");
  }
};

//lay nguoi dung
const GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

//lay all nguoi dung
const GetAlluser = async (req, res) => {
  const query = req.query.new;
  if ((req.user.isAdmin = true)) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("khong co quyen truy cap");
  }
};

//lay tt nguoi dung
const GetStat = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

//thay doi tt ng dung

const UserInfo = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json("cap nhat thanh cong");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = {
  UpdateUser,
  DeleteUser,
  GetUser,
  GetAlluser,
  GetStat,
  UserInfo,
};
