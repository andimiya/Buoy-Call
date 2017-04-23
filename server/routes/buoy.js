const express = require('express');
const router = express.Router();
const db = require('../models'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport')
const { Users, coordinates, buoydata } = db;

router.get('/test/', (req,res) => {
  buoydata.findAll({
    attributes: ['yy', 'mm', 'dd', 'hh', 'wvht', 'wtmp'],
    where: {
      wvht: { $lt: 95 },
      wtmp: { $lt: 900 },
      buoyid: "41002",
      yy: 2014,
      mm: 1,
      dd: 1
    }
  })
  .then((arr) => {
    let average = {
      yy: 2014,
      mm: 1,
      dd: 1,
      wvht: null,
      wtmp: null
    };
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
      sum+=arr[i].dataValues.wvht;
    }
    sum/=arr.length;
    average.wvht = sum;
    console.log(arr[0].dataValues.wvht)
    res.json(average);
  })
})

router.get('/:buoyid/:year/:month', (req, res) => {
  buoydata.findAll({
    order: ["mm", "dd", "hh"],
    attributes: ['mm', 'dd', 'hh', 'wvht', 'wtmp'],
    where: {
      wvht: { $lt: 95 },
      wtmp: { $lt: 900 },
      buoyid: req.params.buoyid,
      yy: req.params.year,
      mm: req.params.month
    }
  })
  .then((arr) => {
    res.json(arr);
  })
})

router.get('/:buoyid/:year', (req, res) => {
  buoydata.findAll({
    order: ["mm", "dd", "hh"],
    attributes: ['yy', 'mm', 'dd', 'hh', 'wvht', 'wtmp'],
    where: {
      wvht: { $lt: 95 },
      wtmp: { $lt: 900 },
      buoyid: req.params.buoyid,
      yy: req.params.year
    }
  })
  .then((arr) => {
    res.json(arr);
  })
})

router.get('/:buoyid/', (req, res) => {
  buoydata.findAll({
    order: ["yy", "mm", "dd", "hh"],
    attributes: ['yy', 'mm', 'dd', 'hh', 'wvht', 'wtmp'],
    where: {
      wvht: { $lt: 95 },
      wtmp: { $lt: 900 },
      buoyid: req.params.buoyid
    }
  })
  .then((arr) => {
    res.json(arr);
  })
})



module.exports = router;