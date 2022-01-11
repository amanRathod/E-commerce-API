const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

const port = process.env.PORT || 5000;

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
