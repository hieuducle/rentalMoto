
const { mutipleMongooseToObject } = require('../../util/mongoose');
const ListMotobike = require('../models/ListMotobike')

class PriceTable {

    priceTable(req, res, next) {
        // res.render('signups/login');

        
                // res.send(user);
        
        ListMotobike.find({})
            .then((motobike) => {
                const user = req.session.user || null;
                res.render('list/price-table', {
                    user: user,
                    motobike: mutipleMongooseToObject(motobike)
                });

            })
    }

   
    // xoa mem
    
 
}
module.exports = new PriceTable;