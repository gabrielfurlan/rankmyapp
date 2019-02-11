import mongoose from "mongoose";

import alerts from './schemas/alerts.schema';
import users from './schemas/users.schema';

const db = mongoose.createConnection(process.env.MONGO_URL || 'mongodb://localhost/rankmyapp');

export default ({
	alerts: db.model('alerts', alerts), 
	users: db.model('users', users) 
});
