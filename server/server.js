/*jshint esversion:6 */

const express = require('express');
const app = express();
const CONFIG = require('./config/config');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const db = require('./models')
let Users = db.User;
const userRoute = require('./routes/Users');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/api/users', userRoute); 

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Controll-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})

app.get('/', (req, res) =>{
  res.send('please work');
});

app.listen(8080, function(){
  console.log('server started')
  db.sequelize.sync();
});

module.exports = app;