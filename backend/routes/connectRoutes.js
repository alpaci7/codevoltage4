const express = require("express");
const {logIn, signUp, forgetPassword, changePassword} = require("../controllers/connectController");


const router = express.Router();




router.post("/login", logIn);
router.post("/signup", signUp);
router.post("/forgetPassword",forgetPassword);
router.post("/changePassword",changePassword);



module.exports = router;