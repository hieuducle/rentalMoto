const express = require('express');

const router = express.Router();

const PriceTableController = require('../app/controllers/PriceTableController');




router.get('/', PriceTableController.priceTable);



module.exports = router;