require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static('public'));

const port = process.env.PORT;
app.listen(port);

module.exports = app;

var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
