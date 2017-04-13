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
    console.log("REQ BODY:",req.body)
    Users.create({
      firstName: req.body.FirstName,
      lastName: req.body.LastName,
      email: req.body.Email,
      password: req.body.Password
    })
    .then((users) =>{
      res.json(users);
    });
  })

  module.exports = router; 