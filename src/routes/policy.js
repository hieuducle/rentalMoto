const express = require('express');

const router = express.Router();

const PolicyController = require('../app/controllers/PolicyController');




router.get('/', PolicyController.policy);




module.exports = router;