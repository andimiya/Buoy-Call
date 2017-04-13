/*jshint esversion:6 */ 

const express = require('express');
const router = express.Router();
const db = require('../models'); 
const Users = db.User;

router.route('/')
  .get( (req, res) => {
    Users.findAll()
      .then( users => {
        console.log('looking for all users', users)
        res.send(users);
      });
  })

  .post( (req, res) =>{
    Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    .then((users) =>{
      res.json(users);
    });
  })

  module.exports = router; 