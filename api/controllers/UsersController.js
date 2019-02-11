import * as service from '../services/UserService';

export default class UsersController {

	/**
	 *	create - static function that save a user in the database
	 *	
	 *	@param {object} request 	it is express request object
	 *	@param {object} response 	it is express reponse object
	 */
	static async create(request, response) {
		const { body } = request;
		const user = await service.create(body);
		
		response.send({ 
			status: 200,
			user
		});
	}

	/**
	 *	findOne - static function that find a specific user in 
	 *	the database
	 *	
	 *	@param {object} request 	it is express request object
	 *	@param {object} response 	it is express reponse object
	 */
	static async findOne(request, response) {
		const { email } = request.params;
		const user = await service.findOne(email);
		
		response.send({ 
			status: 200,
			user
		});
	}

}
