const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app=require('./app');

dotenv.config({path: './config.env'});

const DB=process.env.DATABASE;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
