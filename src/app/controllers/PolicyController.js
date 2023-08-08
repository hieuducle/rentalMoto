
const { mutipleMongooseToObject } = require('../../util/mongoose');

class Policy {

   

    policy(req, res, next) {
        const user = req.session.user || null;
        // res.send(user);
        res.render('list/policy', {
            user: user
        });

        
        // res.render('list/policy');
        
    }

   
    
    
 
}
module.exports = new Policy;