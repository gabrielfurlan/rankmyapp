import * as services from '../services/EbayService';

export default class ProductsController {

	/**
	 *	getProducts - static function that find products on service
	 *	and throw the result for the client
	 *	
	 *	@param {object} request 	it is express request object
	 *	@param {object} response 	it is express reponse object
	 */
	static async getProducts(request, response) {
		response.setHeader('Content-Type', 'application/json');

		const { keywords } = request.query;
		const promise = await services.getProducts(keywords);
		const products = promise.item;
		
		response.send({ 
			status: 200,
			products
		});
	}

}
