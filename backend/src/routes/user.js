const {
  UpdateUser,
  DeleteUser,
  GetUser,
  GetAlluser,
  GetStat,
  UserInfo,
} = require("../controllers/UserController");
const verify = require("../verifyToken");
const router = require("express").Router();

router.put("/password/:id", verify, UpdateUser);
router.delete("/:id", verify, DeleteUser);
router.get("/find/:id", verify, GetUser);
router.get("/", verify, GetAlluser);
router.get("/stats", verify, GetStat);
router.put("/:id", verify, UserInfo);

module.exports = router;
