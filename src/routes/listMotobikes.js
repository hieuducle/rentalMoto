const express = require('express');

const router = express.Router();

const ListMotobikeController = require('../app/controllers/ListMotobikeController');



router.get('/list', ListMotobikeController.show);
router.get('/price', ListMotobikeController.priceTable);
router.patch('/:id/delivery', ListMotobikeController.deliveryCart);



module.exports = router;