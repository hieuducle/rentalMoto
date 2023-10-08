const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Cart = require('../models/Cart');
const ListMotobike = require('../models/ListMotobike');
const RentalListing = require('../models/RentalListing');
class AdminController {

    // show(req, res, next) {

    // }
    create(req, res, next) {
       res.render('admin/create');
    }


    product(req, res, next) {
        ListMotobike.find({})
            .then((product) => {
                res.render('admin/product', {
                    product: mutipleMongooseToObject(product)
                })
            })
            .catch(next);
    }



    // sua ham nay
    customer(req, res, next) {
        RentalListing.find({})
            .then((customers) => {
                let nowDate = new Date();
                
                let customerData = customers.map(customer => {
                    let timeRental;
                    if (customer.startDate < nowDate && customer.endDate > nowDate) {
                        // Tính thời gian thuê còn lại trong mili giây
                        timeRental = customer.endDate - nowDate;
                        
                        let millisecondsPerSecond = 1000;
                        let secondsPerMinute = 60;
                        let minutesPerHour = 60;
                        let hoursPerDay = 24;
                        
                        let totalMilliseconds = timeRental;
                        let totalSeconds = Math.floor(totalMilliseconds / millisecondsPerSecond);
                        let totalMinutes = Math.floor(totalSeconds / secondsPerMinute);
                        let totalHours = Math.floor(totalMinutes / minutesPerHour);
                        let totalDays = Math.floor(totalHours / hoursPerDay);
                        
                        let remainingHours = totalHours % hoursPerDay;
                        let remainingMinutes = totalMinutes % minutesPerHour;
                        // let remainingSeconds = totalSeconds % secondsPerMinute;
                        
                        timeRental = {
                            days: totalDays,
                            hours: remainingHours,
                            minutes: remainingMinutes
                        };
                    } else if (customer.endDate <= nowDate) {
                        timeRental = "Hết hạn thuê";
                    } else {
                        timeRental = "Chưa đến thời hạn thuê";
                    }
                    
                    return {
                        customer: customer.toObject(), // Chuyển đối tượng mongoose thành đối tượng thông thường
                        timeRental: timeRental
                    };
                });
                
                res.render('admin/customer', {
                    customers: customerData
                });
            })
            .catch(next);
    }
    
    // customer(req, res, next) {
    //     RentalListing.find({})
    //         .then((customers) => {
    //             let nowDate = new Date();
                
    //             let customerData = customers.map(customer => {
    //                 let timeRental;
    //                 if (customer.startDate < nowDate && customer.endDate > nowDate) {
    //                     // Tính thời gian thuê còn lại trong mili giây
    //                     timeRental = customer.endDate - nowDate;
                        
    //                     timeRental = timeRental / (1000 * 60 * 60); 
    //                 } else if (customer.endDate <= nowDate) {
    //                     timeRental = "Hết hạn thuê";
    //                 } else {
    //                     timeRental = "Chưa đến thời hạn thuê";
    //                 }
                    
    //                 return {
    //                     customer: customer.toObject(), // Chuyển đối tượng mongoose thành đối tượng thông thường
    //                     timeRental: timeRental
    //                 };
    //             });
                
    //             res.render('admin/customer', {
    //                 customers: customerData
    //             });
    //         })
    //         .catch(next);
    // }
    
    

    // customer(req, res, next) {
    //     RentalListing.find({})
    //         .then((customer) => {
    //             let nowDate = new Date();
    //             let timeRental;
    //             if (customer.startDate < nowDate) {
    //                 timeRental = customer.endDate - nowDate;
    //             } else {
    //                 timeRental = "Chưa đến thời hạn thuê";
    //             }
    //             res.render('admin/customer', {
    //                 customer: mutipleMongooseToObject(customer),
    //                 timeRental: timeRental
    //             })
    //         })
    //         .catch(next);
    // }


    home(req, res, next) {
        let countRental = 0; // Sử dụng let thay vì var
        let income = 0;
        Cart.find({})
            .then((cartItems) => {
                // Duyệt qua tất cả các mục trong giỏ hàng để đếm số lượng có trạng thái
                cartItems.forEach((cartItem) => {
                    if (cartItem.status) {
                        countRental++;
                        income += parseInt(cartItem.price);
                    }
                });
    
                const user = req.session.user || null;
                income = income.toString();
                res.render('admin/home', {
                    user: user,
                    countRental: countRental,
                    income: income,
                    cartItem: mutipleMongooseToObject(cartItems) // Chú ý tên biến
                });
            })
            .catch(next);
            
    }
    

    store(req, res, next) {
        const formData = req.body;
        const motobike = new ListMotobike(formData);
        motobike.save();
        res.render('admin/home');
    }

    destroy(req, res, next) {
        Cart.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/admin/home'))
            .catch(next);
    }

    destroyProduct(req, res, next) {
        ListMotobike.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/admin/product'))
            .catch(next);
    }

    destroyCustomer(req, res, next) {
        RentalListing.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/admin/customer'))
            .catch(next);
    }

    edit(req, res, next) {
        ListMotobike.findById(req.params.id)
            .then((product) => {
                res.render('admin/edit', {
                    product: mongooseToObject(product)
                })
            })
            .catch(next);
    }

    update(req, res, next) {
        ListMotobike.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/product'))
            .catch(next);
    }
    

   
    // xoa mem
    
 
}
module.exports = new AdminController;