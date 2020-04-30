const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');

const { check, validationResult } = require('express-validator');


router.get('/', (req, res) => {
  res.render('form', { title: 'Registration form' });
});

router.get('/users', (req, res) => {
  User.find()
    .then((users) =>{
      res.render('index', {title: 'User Signups', users });
    })
    .catch(() => {res.send('Sorry! Something went wrong.'); });
});

router.post(
  '/',
  [
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
    ],
    (req, res) => {
      const errors = validationResult(req);
  
      if (errors.isEmpty()) {
        const registration = new User(req.body);
        registration.save()
          .then(() => { res.redirect('/users') })
          .catch((err) => {
            console.log(err);
            res.send('Sorry! Something went wrong.');
    });
      } else {
        res.render('form', {
          title: 'Registration form',
          errors: errors.array(),
          data: req.body,
        });
      }
    }
  );

module.exports = router;