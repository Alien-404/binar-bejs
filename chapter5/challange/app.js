// modules
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

// routes
const {
  supplierRoute,
  componentRoute,
  productRoute,
  authRoute,
} = require('./routes');

// local modules
const { errorHandler, notFoundHandler, authHandler } = require('./middleware');
const db = require('./config/connection.db');

// environments
const { PORT } = process.env;
const file = fs.readFileSync('./docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// middlewares route
app.use('/auth', authRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // api docs swagger

// auth middleware
app.use(authHandler); // handler for bearer token middleware

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
