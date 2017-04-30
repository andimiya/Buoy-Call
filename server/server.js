/*jshint esversion:6 */

const express = require('express');
const bcrypt =  require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080
;
const stripe = require("stripe")(process.env.STRIPESECRET_KEY);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(
  session);
const LocalStrategy = require('passport-local').Strategy;
const db = require('./models');
const { Users, coordinates, buoydata } = db;
const userRoute = require('./routes/users');
const buoyRoute = require('./routes/buoy');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Controll-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(session({
  store: new RedisStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUnintialized: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoute)
app.use('/api/buoy', buoyRoute)

passport.use(new LocalStrategy(
  function(email, password, done){
    Users.findOne({
      where: {
        email : email
      }
    }).then(user =>{
      if(user === null){
        return done(null, false, {message: 'bad info'})
      } else {
        bcrypt.compare(password, user.password).then(res => {
          if(res){
            console.log("good info / password")
            return done(null, user, {message: 'good login'});
          } else {
            console.log("bad info / password")
            return done(null, false, {message: 'bad info'});
          }
        })
      }
    }).catch(err =>{
      res.end();
    })
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user);
});

app.post('/api/charge', (req, res) => {
  console.log(req.body.email, 'req BODY');
  stripe.customers.create({
    email: req.body.email,
    source: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
      amount: 500,
      currency: 'usd',
      customer: customer.id
    }))
  .then(charge =>
    res.send('success'));
});

passport.deserializeUser(function(user, done) {
  console.log("DESERIALIZEUSER",user)
  Users.findOne({
    where: {
      email: user.email
    }
  })
  .then(user =>{
    return done(null, user);
  });
});

app.get('/api/allsharks', (req, res) => {
  request('http://www.ocearch.org/tracker/ajax/filter-sharks/?tracking-activity=ping-most-recent', (err, response, body) => {

    Promise.resolve(JSON.parse(body))
    .then((data) => {
      let sharksArray = [];

      for(let i = 0; i < data.length; i++){
        let sharkCoordinates = {
          lat: data[i].pings[0].latitude,
          lng: data[i].pings[0].longitude,
          popup: 'test'
        };
        sharksArray.push(sharkCoordinates);
      }
      res.json(sharksArray);
    });
  });
});

app.get('/api/allbuoys', (req, res )=> {
  Promise.all([
    coordinates.findAll({
      attributes: ['buoyid', 'lat', 'long']
    }),
    buoydata.findOne({
      attributes: ['buoyid', 'wvht']
    })
  ])
  .then((arr) => {
    console.log(arr, 'array')
    res.send(arr);
  });
});

app.listen(PORT, function(){
  console.log('server started on', PORT);
  db.sequelize.sync();
});

module.exports = app;
