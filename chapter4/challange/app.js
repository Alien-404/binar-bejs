// modules
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// routes
const { supplierRoute, componentRoute, productRoute } = require('./routes');
// middleware
const { errorHandler, notFoundHandler } = require('./middleware');
const db = require('./config/connection.db');

// environments
const { PORT } = process.env;

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// middlewares route
app.use('/supplier', supplierRoute);
app.use('/component', componentRoute);
app.use('/product', productRoute);

// error handling middleware
app.use(errorHandler);
app.use(notFoundHandler);

// listen
app.listen(PORT || 3000, async () => {
  console.log(`run on http://localhost:${PORT || 3000}`);
  await db.initialize();
});
