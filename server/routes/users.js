/*jshint esversion:6 */ 

const express = require('express');
const router = express.Router();
const db = require('../models'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = db.User;

router.route('/')
  .get( (req, res) => {
    Users.findAll()
      .then( users => {
        //console.log('looking for all users', users)
        res.send(users);
      });
  })

  .post( (req, res) =>{
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.Password, salt, function(err, hash) {
        Users.create({
          firstName: req.body.FirstName,
          lastName: req.body.LastName,
          email: req.body.Email,
          password: hash
        })
        .then((users) =>{
          res.json(users);
        })
        .catch(err => {
          console.log("error goes here I.E. USER ALREADY EXISTS", err);
          //redirect to making user again and/or flash the error message
        })
      })
    })
  })

  module.exports = router; 