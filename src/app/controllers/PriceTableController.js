






const { mutipleMongooseToObject } = require('../../util/mongoose');

class PriceTable {

    // show(req, res, next) {
    //     ListMotobike.find({})
    //         .then((motobike) => {
    //             res.render('list/motobikes', { motobike: mongooseToObject(motobike) });
    //         })
    //         .catch(next);
    // }

    

    priceTable(req, res, next) {
        // res.render('signups/login');

        const user = req.session.user || null;
                // res.send(user);
                res.render('list/price-table', {
                    user: user
                });
        // res.render('list/price-table');
        // res.send('s');
    }

   
    // xoa mem
    
 
}
module.exports = new PriceTable;