/*jshint esversion:6 */

const express = require('express');
const app = express();
const CONFIG = require('./config/config');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080
;

const db = require('./models');
const { Users, coordinates, buoydata } = db;
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

      // console.log(coordinates, 'coordinates');
      console.log(buoydata, 'buoydata');
      console.log(coordinates, 'coordinates');
      let geoJSON = {};
      geoJSON.type = "Feature Collection";
      geoJSON.features = [];
      for(let i = 0; i < coordinates.length; i++){
        let newChild = {};
        newChild.type = "Feature";
        newChild.properties = {
          title: `The current waveheight for this buoy is ${buoydata.dataValues.wvht}
          Waveheight is ${coordinates.dataValues.lat}`
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

app.listen(PORT, function(){
  console.log('server started on', PORT);
  db.sequelize.sync();
});

module.exports = app;
