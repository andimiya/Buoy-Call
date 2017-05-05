/*jshint esversion:6 */

const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = db.Users;
const passport = require('passport')

function userAuthenticator(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else {
    res.redirect('/users/notLoggedInBro')
  }
}


router.route('/')
  .get( (req, res) => {
    Users.findAll()
    .then( users => {
      res.send(users);
    })
    .catch(err =>{
      res.send(err);
    })
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
        .catch(err =>{
          res.send(err);
        })
      })
    })
  })

router.put('/changefirstname', userAuthenticator, (req, res) => {
  Users.update(
  {
    firstName: req.body.FirstName
  },
  { where: {email: req.user.email }}
  )
  .then(() => {
  res.send('success')
  })
  .catch(err =>{
    res.send(err);
  })
});

router.put('/changelastname', userAuthenticator, (req, res) => {
  Users.update(
  {
    lastName: req.body.LastName
  },
  { where: {email: req.user.email }}
  )
  .then(() => {
  res.send('success')
  })
  .catch(err =>{
    res.send(err);
  })
});


router.put('/changepassword', userAuthenticator, (req, res) =>{
  bcrypt.genSalt(saltRounds, function(err,salt){
    bcrypt.hash(req.body.Password, salt, function(err, hash){
      Users.update(
        {
        password: hash
      },
        {
          where: {email: req.user.email}
        })
      .then(() =>{
        res.send('success')
      })
      .catch(err =>{
        res.send(err);
      })
    })
  })
})

router.put('/changeemail', userAuthenticator, (req, res) => {
  Users.update(
  {
    email: req.body.Email
  },
  { where: {email: req.user.email }}
  )
  .then(() => {
  res.send('success')
  })
  .catch(err =>{
    res.send(err);
  })
});

router.route('/login')
  .post(passport.authenticate('local'), function(req, res){
    res.send(req.user)
  });

router.route('/logout')
  .post((req, res, err) => {
    req.logout()
    res.end()
  });

router.route('/checkLogin')
  .post(function(req,res){
    res.send(req.user)
  });

  module.exports = router;
