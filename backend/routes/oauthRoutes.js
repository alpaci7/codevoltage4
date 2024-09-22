const express = require('express');
const { oauthConnect } = require('../controllers/oauthController');


const router = express.Router();

router.get("/google/redirect",oauthConnect);

module.exports = router;

