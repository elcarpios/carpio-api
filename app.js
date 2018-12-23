'use strict';

const express = require('express');
const app = express();

const cors = require('cors');

const { initRoutes, router } = require('./routes');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://www.carpioproyecto.com' }));
app.use('/api', router);

app.listen(port, initRoutes);
