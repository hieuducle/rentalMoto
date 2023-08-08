
const listMotobikeRouter = require('./listMotobikes');
const priceTableRouter = require('./priceTable');
const policyRouter = require('./policy');
const contactRouter = require('./contact');
const userRouter = require('./user');
const rentalListingRouter = require('./rentalListing');
const cartRouter = require('./cart');



function route(app) {

    
    app.use('/listMotobikes', listMotobikeRouter);
    app.use('/priceTable', priceTableRouter);
    app.use('/policy', policyRouter);
    app.use('/contact', contactRouter);
    app.use('/user', userRouter);
    app.use('/rentalListing', rentalListingRouter);
    app.use('/cart', cartRouter);
    app.use('/', userRouter);
    
}

module.exports = route;