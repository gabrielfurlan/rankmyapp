import mongo from '../mongodb';

/**
 *	create - it is a function the create a new user in mongo database
 *	@param {object} data	it contains user info to be save
 *	@returns {promise}	contains saved user 
 */
export const create = (data) => {
	const user = new mongo.users(data);
	return user.save();
};

/**
 *	findOne - it is a function that find a user on mongo database
 *	@param {string} email	it contains user email
 *	@returns {promise}	contains the user 
 */
export const findOne = (email) => {
	return mongo.users.findOne({ email })
							.populate('alerts');
};
