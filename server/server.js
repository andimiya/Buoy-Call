/*jshint esversion:6 */

const express = require('express');
const bcrypt =  require('bcrypt');
const app = express();
const CONFIG = require('./config/config.json');
const bodyParser = require('body-parser');
const request = require('request');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080
;
const stripeConfig = ('../../../config');
const stripe = require("stripe")(process.env.STRIPEPUBLISHABLE_KEY);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(
  session);
const LocalStrategy = require('passport-local').Strategy;

const db = require('./models');
const { Users, coordinates, buoydata } = db;
const userRoute = require('./routes/users');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/api/users', userRoute)

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Controll-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(session({
  store: new RedisStore(),
  secret: CONFIG.SESSION_SECRET,
  resave: false,
  saveUnintialized: true
}));


app.use(session({
  secret: CONFIG.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(email, password, done){
    console.log("email", email)
    console.log("password", password)
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

app.post('/charge', (req, res) => {
  let amount = 500;
  // console.log(req.body.id, 'Request BODY');
  // stripe.customers.create({
  //   email: req.body.email,
  //   source: req.body.id
  // })
  // .then(customer => {
    // console.log(customer, 'card');
    stripe.charges.create({
      amount,
      currency: 'usd',
      source: req.body.id
      // customer: customer.id
    })
  .then(charge => {
    console.log('payment done');
    res.send('success');
  })
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


app.get('/allsharks', (req, res) => {
  request('http://www.ocearch.org/tracker/ajax/filter-sharks/?tracking-activity=ping-most-recent', (err, response, body) => {
    Promise.resolve(JSON.parse(body))
    .then((data) => {
      let geoJSON = {};
      geoJSON.type = "Feature Collection";
      geoJSON.features = [];
      for(let i = 0; i < data.length; i++){
        let newChild = {};
        newChild.type = "Feature";
        newChild.properties = {
          title: `Sharks name: ${data[i].name}<br>
          Length: ${data[i].length}<br>
          Weight: ${data[i].weight}<br>
          Species: ${data[i].species}<br>
          Last seen: ${data[i].pings[0].datetime}`,
          'marker-symbol': 'star',
          'marker-color': '#097BED'
        };
        newChild.geometry = {
          type: "Point",
          coordinates: [data[i].pings[0].longitude,
          data[i].pings[0].latitude]
        };
        geoJSON.features.push(newChild);
      }
      res.json(geoJSON);
    });
  });
});

app.get('/allbuoys', (req, res )=> {
  Promise.all([
    coordinates.findAll({
      attributes: ['buoyid', 'lat', 'long']
    }),
    buoydata.findOne({
      attributes: ['buoyid', 'wvht']
    })
  ])
  .then((arr) => {
    let coordinates=arr[0];
    let buoydata=arr[1];
      let geoJSON = {};
      geoJSON.type = "Feature Collection";
      geoJSON.features = [];
      for(let i = 0; i < coordinates.length; i++){
        let newChild = {};
        newChild.type = "Feature";
        newChild.properties = {
          title: `The current waveheight for this buoy is ${buoydata.dataValues.wvht}`,
          'marker-symbol': 'lighthouse',
        };
        newChild.geometry = {
          type: "Point",
          coordinates: [coordinates[i].dataValues.long, coordinates[i].dataValues.lat]
        };
        geoJSON.features.push(newChild);
      }
      res.json(geoJSON);
  });
});

app.get('/somebuoys', (req, res )=> {
    buoydata.findAll({
      attributes: ['mm','dd','hh','wvht','wtmp'],
      where: {
        yy: 2012,
        mm: 6,
        buoyid: "41002"
      }
    })
  .then((arr) => {
    console.log('arr', typeof(arr));
    res.json(arr);
  });
});

app.get('/somebuoys', (req, res )=> {
    buoydata.findAll({
      attributes: ['mm','dd','hh','wvht','wtmp'],
      where: {
        yy: 2012,
        mm: 6,
        buoyid: "41002"
      }
    })
  .then((arr) => {
    console.log(arr, 'arr');
    res.json(arr);
  });
});

app.listen(PORT, function(){
  console.log('server started on', PORT);
  db.sequelize.sync();
});

module.exports = app;
