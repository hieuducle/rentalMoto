const { mutipleMongooseToObject } = require('../../util/mongoose');
const Cart = require('../models/Cart');
const ListMotobike = require('../models/ListMotobike');
class AdminController {

    // show(req, res, next) {

    // }
    create(req, res, next) {
       res.render('admin/create');
    }

    store(req, res, next) {
        const formData = req.body;
        const motobike = new ListMotobike(formData);
        motobike.save();
        res.render('admin/home');
    }

   
    // xoa mem
    
 
}
module.exports = new AdminController;