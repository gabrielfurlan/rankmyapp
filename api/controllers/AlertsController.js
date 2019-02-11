import * as service from '../services/AlertService';

export default class AlertsController {

	/**
	 *	create - static function that save a alert in the database
	 *	
	 *	@param {object} request 	it is express request object
	 *	@param {object} response 	it is express reponse object
	 */
	static async create(request, response) {
		const { body } = request;
		const data = await service.create(body);
		const { success, code, alert } = data;
		
		response.send({ 
			status: success ? 200 : 400,
			code,
			alert
		});
	}

	/**
	 *	findOne - static function that find a specific alert in 
	 *	the database
	 *	
	 *	@param {object} request 	it is express request object
	 *	@param {object} response 	it is express reponse object
	 */
	static async findOne(request, response) {
		const { _id } = request.params;
		const alert = await service.findOne(_id);
		
		response.send({ 
			status: 200,
			alert
		});
	}

	/**
	 *	edit - static function that edit a specific alert in 
	 *	the database
	 *	
	 *	@param {object} request 	it is express request object
	 *	@param {object} response 	it is express reponse object
	 */
	static async edit(request, response) {
		response.send({ 
			status: 200
		});
	}

	/**
	 *	delete - static function that delete a specific alert in 
	 *	the database
	 *	
	 *	@param {object} request 	it is express request object
	 *	@param {object} response 	it is express reponse object
	 */
	static async delete(request, response) {
		response.send({ 
			status: 200
		});
	}

}
