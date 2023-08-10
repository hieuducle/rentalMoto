const User = require('../models/User')
const Cart = require('../models/Cart')
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { check } = require('prettier');

class UserController {

    home(req, res, next) {
        const user = req.session.user || null;
        res.render('home/site', {
            user: user
        });
    }
    signIn(req, res, next) {
        res.render('user/signIn');  
    }

    signUp(req, res, next) {
        res.render('user/signUp');
    }

    logout(req, res, next) {
      req.session.destroy();
      // res.redirect('/user/signIn');
      res.render('user/signIn');
    }
    

    store(req, res, next) {
    
        const formData = req.body;
        const user = new User(formData);
        user.save();
        res.redirect('/user/signIn');
    }

    cart(req, res, next) {
      const user = req.session.user || null;
      const phone = user.phone;
      
      Cart.find({phone: phone})
            .then((cart) => {
                res.render('list/cart', {
                    cart: mutipleMongooseToObject(cart),
                    user: user
                    

                });
            })
            .catch(next);

  }


    async storeSignIn(req, res, next) {
        try {
          const { phone, password } = req.body;
          const user = await User.findOne({ phone: phone });
          
          if (!user) {
            // Không tìm thấy người dùng với số điện thoại đã nhập
            res.send("Người dùng không tồn tại");
            return;
          }
      
          const isPasswordMatch = user.password === password;
      
          if (isPasswordMatch && phone != 0) {
            req.session.user = user;
            
            // res.redirect('/user/account');
              res.render('account/user', {
                user: req.session.user // Convert the user data to a regular object to pass to the template
                
         });

         return;
           
          } else if (isPasswordMatch && phone == 0) {
            
            
            Cart.find({})
              .then((cartItem) => {
                req.session.user = user;
                res.render('admin/home', {
                  user: req.session.user,
                  cartItem: mutipleMongooseToObject(cartItem), // Convert the user data to a regular object to pass to the template
                });

              })
              .catch(next)


              
            // res.redirect('/user/account');

              return;
          }
      
          // // Mật khẩu không khớp
          res.send("Mật khẩu không đúng");
        } catch (error) {
          // Xử lý lỗi nếu có
          res.send("Đã xảy ra lỗi trong quá trình đăng nhập");
        }
      }
    }

      
      



module.exports = new UserController;