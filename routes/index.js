const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');
const path = require('path');
const auth = require('http-auth');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

const { check, validationResult } = require('express-validator');


router.get('/', basic.check((req, res) => {
  res.render('form', { title: 'Registration form' });
}));

router.get('/users', basic.check((req, res) => {
  User.find()
    .then((users) =>{
      res.render('index', {title: 'User Signups', users });
    })
    .catch(() => {res.send('Sorry! Something went wrong.'); });
}));


router.get('/users/delete', (req,res) =>{
  var myId = req.query.id;
  const url = process.env.DATABASE;
  var query = { "_id": ObjectId(myId) };

  // Database Name
  const dbName = 'signup-form';

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {

    const db = client.db(dbName);
    coll = db.collection('users');

    coll.deleteOne(query, (err, obj) => {
             if(err) throw err;

      client.close().then(() => {res.redirect('/users')});
    });
  });
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
