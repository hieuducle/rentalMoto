const express = require('express')
// const hbs  = require('express-handlebars')
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path')
const session = require('express-session')


const handlebars = require('express-handlebars')
const app = express()
const port = 3000


const handlebarss = require('handlebars');

handlebarss.registerHelper('eq', function(a, b) {
  return a === b;
});


handlebarss.registerHelper('formatPrice', function(price) {
  // price = price.toLocaleString('vi-VN');
  price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  console.log(price)
  return price;
});

handlebarss.registerHelper('isNumber', function(value) {
  return typeof value === 'number';
});

handlebarss.registerHelper('isObject', function(value) {
  return typeof value === 'object';
});

const hbsP = handlebars.create({
  helpers: {
    formatPrice: function(price) {
      // Định dạng số tiền với dấu chấm phân cách
      
    }
  }
});


const route = require('./routes')
const db = require('./config/db')

// connect db
db.connect()

app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded(
  {
    extended: true 
  }
))
app.use(express.json())
app.use(methodOverride('_method'));

app.use(session({
  secret: '11',
  resave: false,
  saveUninitialized: true
}));

app.engine('handlebars', handlebars.engine());

app.set('view engine','handlebars')
app.set('views', path.join(__dirname, 'resourses','views'));



route(app)



app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})



