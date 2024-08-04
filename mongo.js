const mongoose = require('mongoose');
const { mongoURI } = require('./config.json');

module.exports = async () => {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};
