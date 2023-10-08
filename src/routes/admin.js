const express = require('express');

const router = express.Router();

const AdminController = require('../app/controllers/AdminController');


router.get('/create', AdminController.create);
router.get('/home', AdminController.home);
router.get('/product', AdminController.product);
router.get('/customer', AdminController.customer);
router.post('/store', AdminController.store);
router.delete('/:id', AdminController.destroy);
router.delete('/:id/listMoto', AdminController.destroyProduct);
router.delete('/:id/customer', AdminController.destroyCustomer);

router.get('/:id/edit', AdminController.edit);
router.put('/:id/update', AdminController.update);







module.exports = router;