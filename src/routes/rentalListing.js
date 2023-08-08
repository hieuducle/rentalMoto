const express = require('express');

const router = express.Router();

const RentalListingController = require('../app/controllers/RentalListingController');

router.get('/', RentalListingController.show);

router.post('/store', RentalListingController.store);




module.exports = router;