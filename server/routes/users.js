/*jshint esversion:6 */

const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = db.User;
const passport = require('passport')

function userAuthenticator(req, res, next){
  if(req.isAuthenticated()){
    console.log("yes!");
    next();
  } else {
    console.log("nope didn't work");
    res.redirect('/users/notLoggedInBro')
  }
}

router.route('/')
  .get( (req, res) => {
    Users.findAll()
      .then( users => {
        //console.log('looking for all users', users)
        res.send(users);
      });
  })

  .post((req, res) =>{
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
        })
      })
    })
  })

router.route('/login')
  .post(passport.authenticate('local'), function(req, res){
    console.log("successfully logged in")
    res.send(req.user)
  })

router.route('/checkLogin')
  .post(function(req,res){
    console.log(req.user)
    res.send(req.user)
  })

  module.exports = router;
