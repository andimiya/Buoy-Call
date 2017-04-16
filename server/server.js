/*jshint esversion:6 */

const express = require('express');
const bcrypt =  require('bcrypt');
const app = express();
const CONFIG = require('./config/config.json');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(
  session);
const LocalStrategy = require('passport-local').Strategy;
const PORT = process.env.PORT || 8080;

const db = require('./models')
let Users = db.User;
const userRoute = require('./routes/users');

app.use(express.static('public'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Controll-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})

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


app.use('/api/users', userRoute); 

app.listen(PORT, function(){
  console.log('server started on', PORT)
  db.sequelize.sync();
});

module.exports = app;