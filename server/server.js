/*jshint esversion:6 */

const express = require('express');
const app = express();
const CONFIG = require('./config/config');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080
;

const db = require('./models');
const { Users, coordinates } = db;
const userRoute = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/api/users', userRoute);

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Controll-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get('/', (req, res) =>{
  res.send('please work');
});

app.get('/allbuoys', (req, res )=> {
  coordinates.findAll({
    attributes: ['buoyid', 'lat', 'long']
  })
  .then((arr) => {
    console.log(arr, 'arr');
    console.log(arr[1].dataValues.buoyid);
      let geoJSON = {};
      geoJSON.type = "Feature Collection";
      geoJSON.features = [];
      for(let i = 0; i < arr.length; i++){
        let newChild = {};
        newChild.type = "Feature";
        newChild.properties = {
          name: arr[i].dataValues.buoyid
        };
        newChild.geometry = {
          type: "Point",
          coordinates: [arr[i].dataValues.long, arr[i].dataValues.lat]
        };
        geoJSON.features.push(newChild);
      }
      res.json(geoJSON);
  });
});

app.listen(PORT, function(){
  console.log('server started on', PORT);
  db.sequelize.sync();
});

module.exports = app;