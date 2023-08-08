

const Cart = require('../models/Cart')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

const moment = require('moment');
class CartController {

    pay(req, res, next) {

        Cart.findById(req.params.id)
        .then(motobike => res.render('account/checkout', {
            motobike: mongooseToObject(motobike)
        }))
        .catch(next) 
        // res.render('');
    }



    vnpay(req, res, next) {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    
    var tmnCode = 'RVWE59H8';
    var secretKey = 'UHQKQRMVNCBQDMUDIVLZKFITZOICFLMV';
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = "http://localhost:3000/cart/vnpay_return";
    

    var date = new Date();
    var createDate = moment(date).format('YYYYMMDDHHmmss');
    
    // var createDate = dateFormat(date, 'yyyymmddHHmmss');
    

    
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    
    let locale = req.body.language;
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    // vnp_Params['vnp_TxnRef'] = req.params.id;

    
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

         function sortObject(obj) {
            var sorted = {};
            var str = [];
            var key;
            for (key in obj){
                if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
                }
            }
            str.sort();
            for (key = 0; key < str.length; key++) {
                sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
            }
            return sorted;
        }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    
    // res.send(req.params.id);
    Cart.findById(req.params.id)
        .then(cartItem => {
            if (cartItem) {
                cartItem.status = true;
                cartItem.save();
              } else {
                console.log('loi o sua status');
              }
        }) 
        .catch(next) 
        
    res.redirect(vnpUrl)

    }

    vnpayReturn(req, res, next) {
        
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        function sortObject(obj) {
            var sorted = {};
            var str = [];
            var key;
            for (key in obj){
                if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
                }
            }
            str.sort();
            for (key = 0; key < str.length; key++) {
                sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
            }
            return sorted;
        }

        vnp_Params = sortObject(vnp_Params);


        var tmnCode = 'RVWE59H8';
        var secretKey = 'UHQKQRMVNCBQDMUDIVLZKFITZOICFLMV';

        let querystring = require('qs');
        
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");     
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

        if(secureHash === signed){
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

            res.render('account/success', 
            {code: vnp_Params['vnp_ResponseCode'],
            id: vnp_Params['vnp_TxnRef']
        })
        } else{
            res.render('account/success', {code: '97'})
        }
    }


}
module.exports = new CartController;