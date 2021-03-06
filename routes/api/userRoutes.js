const router = require("express").Router();
const userController = require("../../controllers/user");
const reqLogin = require('../../middleware/reqLogin')

router.route("/:id")
  .get(reqLogin, userController.getUserEvents);

router.route("/attending/:id")
  .get(userController.getUserAttendingEvents);

module.exports = router;
