const RentalListing = require('../models/RentalListing')
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class RentalListingController {

  show(req, res, next) {
    RentalListing.find({})
        .then(user => res.render('list/rentalListing', {
            user: mutipleMongooseToObject(user)
        }))
        .catch(next)
}

    store(req, res, next) {
    
        const formData = req.body;
        const user = new RentalListing(formData);
        user.save();
        // res.send('saved-signup');
        res.redirect('/user/signIn');
    }

    }

      

module.exports = new RentalListingController;