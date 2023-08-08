const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
async function connect() {
    

    try {
        // await mongoose.connect("mongodb://127.0.0.1:27017/F8_education_dev");
        await mongoose.connect('mongodb://localhost/Producation_move');
        // mongoose.set("strictQuery", false);

        
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };