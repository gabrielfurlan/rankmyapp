import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config({ path: path.join(__dirname, '../.env') });

import * as AlertService from './services/AlertService';

import AlertsController from './controllers/AlertsController';
import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';

// Configurations
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// Routes
app.get('/api/products', ProductsController.getProducts);

app.post('/api/users', UsersController.create);
app.get('/api/user/:email', UsersController.findOne);

app.post('/api/alerts', AlertsController.create);
app.get('/api/alert/:_id', AlertsController.findOne);
app.delete('/api/alert/:_id', AlertsController.remove);

// Initializing
const port = 3001;
app.listen(port, err => {
	if(err) console.log(err);
	else console.log(`Server online - Listening to port ${port}`);
});

// Initializing Jobs
cron.schedule('*/1 * * * * *', () => {
	AlertService.throwAlerts();
});
