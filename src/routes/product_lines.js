const express = require('express');

const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
// router.get('/switch', courseController.switch_data);

router.post('/store', courseController.store);
// router.patch('/:id/delivery', courseController.delivery);
router.patch('/:id/deliveryFactory1', courseController.deliveryFactory1);
router.patch('/:id/deliveryFactory2', courseController.deliveryFactory2);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);

router.delete('/:id', courseController.destroy);
// router.post('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.get('/:slug', courseController.show);



module.exports = router;