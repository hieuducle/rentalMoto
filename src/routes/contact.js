const express = require('express');

const router = express.Router();

const ContactController = require('../app/controllers/ContactController');




router.get('/', ContactController.contact);



module.exports = router;