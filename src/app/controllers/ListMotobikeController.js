const ListMotobike = require('../models/ListMotobike');

const User = require('../models/User');
const Cart = require('../models/Cart');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class ListMotobikeController {

     

   
    
    show(req, res, next) {

        

        ListMotobike.find({})
            .then((motobike) => {
                // Kiểm tra xem có người dùng đã đăng nhập hay không
                const user = req.session.user || null;
                // res.send(user);
                res.render('list/motobikes', {
                    motobike: mutipleMongooseToObject(motobike),
                    
                    user: user
                });
            })
            .catch(next);
    }
    priceTable(req, res, next) {
        // res.render('signups/login');
        res.render('list/price-table');
        // res.send('s');
    }

    create(req, res, next) {
        res.render('product_lines/create');
    }

    store(req, res, next) {
        // res.json(req.body);
        const formData = req.body;
        const product_lines = new Course(formData);
        product_lines.save();
        // res.send('saved-courses');
        res.redirect('/me/stored/product_lines');

    }
    
    deliveryCart(req, res, next) {
        ListMotobike.findById(req.params.id, function (err, docs) {
            if (err) {
                res.send(err);
            } else {
                const user = req.session.user || null;

                // Tạo một instance mới của Cart
                const cartItem = new Cart({
                    username: user.name,
                    name: docs.name,
                    image: docs.image,
                    phone: user.phone,
                    price: docs.price,
                    status: '0',
                    slug: docs.slug
                });

                // Lưu instance vào database
                cartItem.save()
                    .then(() => {
                        // Nếu lưu thành công, chuyển hướng tới trang danh sách xe hoặc trang giỏ hàng
                        
                        res.redirect('/listMotobikes/list'); // Thay đổi đường dẫn theo ý muốn
                    })
                    .catch(error => {
                        // Xử lý lỗi nếu có
                        res.send("Đã xảy ra lỗi trong quá trình xử lý đơn hàng");
                    });
            }
        });
    }
    
 
}
module.exports = new ListMotobikeController;