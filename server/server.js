/*jshint esversion:6 */

const express = require('express');
const bcrypt =  require('bcrypt');
const app = express();
const CONFIG = require('./config/config');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(
  session);
const LocalStrategy = require('passport-local').Strategy;
const PORT = process.env.PORT || 8080;

const db = require('./models')
let Users = db.User;
const userRoute = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/api/users', userRoute); 

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Controll-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})

app.use(session({
  store: new RedisStore(),
  secret: 'keyboard cat', 
  resave: false, 
  saveUnintialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: CONFIG.SESSION_SECRET
}));


function checkPassword(plainTextPassword, passwordInDb){
  return bcrypt.compare(plainTextPassword, passwordInDb, function(err, res){
    return res;
  })
}

passport.use(new LocalStrategy(
  function(email, password, done){
    User.findOne({
      where: {
        email : email
      }
    }).then(user =>{
      if(user === null){
        return done(null, false, {message: 'bad info'})
      } else {
        bcrypt.compare(password, user.password).then(res => {
          if(res){
            return done(null, user);
          } else {
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
  return done(null, {
    where: {
      email: user.email
    }
  }) .then(user =>{
    return done(null, user);
  });
});

passport.deserializeUser(function(user, done) {
  User.findOne({
    where: {
      email: user.email
    }
  }).then(user =>{
    return done(null, user);
  });
});

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else {
    console.log('nope');
    res.redirect('/login');
  }
}

app.get('/', (req, res) =>{
  res.send('please work');
});

app.listen(PORT, function(){
  console.log('server started on', PORT)
  db.sequelize.sync();
});

module.exports = app;