/*jshint esversion:6 */

const express = require('express');
const app = express();
const CONFIG = require('./config/config');
const bodyParser = require('body-parser');
const request = require('request');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080
;
const stripe = require('stripe')('sk_test_tAmOhr34X7M9LtSFTFBeqHvM');

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

app.post('/stripe', (req, res) => {

  const token = req.body.stripeToken;

  stripe.charges.create({
    source: stripeToken,
    amount: 1000,
    currency: "usd",
    description: "Example charge"
  },
  function(err, charge) {
    if (err) {
        res.send(500, err);
    } else {
        res.send(204);
    }
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
    })
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

app.listen(PORT, function(){
  console.log('server started on', PORT);
  db.sequelize.sync();
});

module.exports = app;
