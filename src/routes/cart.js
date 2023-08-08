const express = require('express');

const router = express.Router();

const CartController = require('../app/controllers/CartController');




router.patch('/:id/pay', CartController.pay);
router.post('/:id/vnpay', CartController.vnpay);
router.get('/vnpay_return', CartController.vnpayReturn);





module.exports = router;