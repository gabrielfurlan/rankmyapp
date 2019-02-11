import axios from 'axios';
const getEbayItemUri = (clientId, keywords) => `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${clientId}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${keywords}&paginationInput.entriesPerPage=3`;

/** 
 *	getProducts - it is a function that find product 
 *	on ebay api
 *	
 *	@param {string} keyword	it is keyword use to filter summary list 
 * 	returns {promise}	contains if resolved a product summary   
 */
export const getProducts = async (keywords) => {
	const uri = getEbayItemUri(process.env.REACT_APP_CLIENT_ID, keywords);
	const promise = await axios.get(uri);
	
	return promise.data.findItemsByKeywordsResponse[0]
	.searchResult[0];
};
