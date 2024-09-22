const express = require("express");
const { editProfile, verifyAccount,checkToken } = require("../controllers/userController");

const router = express.Router();


router.post("/editProfile",editProfile);

router.post("/verifyAccount",verifyAccount);

router.post("/checkToken",checkToken);


module.exports = router;