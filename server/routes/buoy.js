const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport')
const { Users, coordinates, buoydata, aggregatetodays } = db;
const sequelize = require('sequelize')

router.get('/test/', (req, res) => {
  aggregatetodays.findAll({
    order: ['yy','mm','dd'],
    attributes: ['yy', 'mm', 'dd', 'wvht', 'wtmp'],
    where: {
      buoyid: '41002',
      mm: 1,
      yy: 2016
    }
  })
  .then((arr) => {
    res.json(arr);
  })
  .catch(err =>{
    res.send(err);
  })
})

router.get('/test/:buoyid/:year/:month', (req, res) => {
  aggregatetodays.findAll({
    order: ['yy','mm','dd'],
    attributes: ['yy', 'mm', 'dd', 'wvht', 'wtmp', 'atmp', 'apd', 'dpd'],
    where: {
      buoyid: req.params.buoyid,
      mm: req.params.month,
      yy: req.params.year
    }
  })
  .then((arr) => {
    res.json(arr);
  })
  .catch(err =>{
    res.send(err);
  })
})

router.get('/test/:month', (req, res) => {
  aggregatetodays.findAll({
    order: ['yy','mm','dd'],
    attributes: ['yy', 'mm', 'dd', 'wvht', 'wtmp'],
    where: {
      buoyid: '41001',
      mm: req.params.month,
      yy: 2012
    }
  })
  .then((arr) => {
    res.json(arr);
  })
  .catch(err =>{
    res.send(err);
  })
})

router.get('/:buoyid/getDataYears', (req, res) => {
  aggregatetodays.findAll({
    order: ['yy'],
    attributes: [sequelize.literal('distinct "yy"'),'yy'],
    where: {
      buoyid: req.params.buoyid
    }
  })
  .then((arr) => {
    res.json(arr);
  })
  .catch(err =>{
    res.send(err);
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
  .catch(err =>{
    res.send(err);
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
  .catch(err =>{
    res.send(err);
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
  .catch(err =>{
    res.send(err);
  })
})

module.exports = router;
