const mongoose = require('mongoose');

const connectToMongoDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Conexión exitosa a MongoDB');
    })
    .catch((err) => {
      console.error('Error conectando a MongoDB:', err);
    });
};

module.exports = connectToMongoDB;