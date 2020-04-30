require('dotenv').config();
require('./models/user');
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb+srv://m001-students:web215@web215-um2om.mongodb.net/signup-form', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});

