
const { mutipleMongooseToObject } = require('../../util/mongoose');

class Contact {

    contact(req, res, next) {
        // res.render('signups/login');
        const user = req.session.user || null;
                // res.send(user);
                res.render('list/contact', {
                    user: user
                });
        // res.render('list/contact');
        // res.send('s');
    }

   
    // xoa mem
    
 
}
module.exports = new Contact;