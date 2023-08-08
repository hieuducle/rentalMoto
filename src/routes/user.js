const express = require('express');

const router = express.Router();

const UserControllerController = require('../app/controllers/UserController');

router.get('/signUp',  UserControllerController.signUp);

router.get('/signIn', UserControllerController.signIn);
router.get('/logout', UserControllerController.logout);
router.post('/store', UserControllerController.store);
router.post('/storeSignIn',  UserControllerController.storeSignIn);
router.get('/cart',  UserControllerController.cart);
router.get('/', UserControllerController.home);




module.exports = router;