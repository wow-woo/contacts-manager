const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get('mongoURI');

const connectDB = async () => {
  try {
    const access = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('mongoDB connected'.bgBlue);
  } catch (err) {
    console.log(err.message.red);
    process.exit(1);
  }
};

module.exports = connectDB;
