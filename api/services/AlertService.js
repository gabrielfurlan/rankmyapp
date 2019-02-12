import mongo from '../mongodb';
import * as ebay from './EbayService';
import * as mail from './EmailService';

/**
 *	create - it is a function the create a new alert in mongo database
 *	@param {object} data	it contains alert info to be save
 *	@returns {promise}	contains status, code and saved alert 
 */
export const create = async (data) => {
	let alert = new mongo.alerts(data);
	
	const regexp = new RegExp(`^${data.keywords}$`, 'gi')
	const alerts = await mongo.alerts.find({ user: data.user, keywords: regexp });

	if(alerts.length) return ({ success: false, code: 'alert/duplicate' })

	const user = await mongo.users.findOne({ _id: alert.user });
	user.alerts.push(alert);

	await user.save();
	await alert.save();

	return ({ success: true, code: 'alert/saved', alert });
};

/**
 *	findOne - it is a function that find a alert on mongo database
 *	@param {string} _id	it contains alert id
 *	@returns {promise}	contains the alert 
 */
export const findOne = (_id) => {
	return mongo.alerts.findOne({ _id })
							.populate('user');
};

/**
 *	remove - it is a function that delete a alert on mongo database
 *	@param {string} _id it contains alert id
 *	@returns {promise}	contains the deleted alert 
 */
export const remove = async (_id) => { 
	const alert = await mongo.alerts.findOne({ _id })
	const user = await mongo.users.findOne({ _id: alert.user });

	const index = user.alerts.findIndex(id => id === _id)
	user.alerts.splice(index, 1);
	user.save();

	return alert.remove();
}

/**
 *	throwAlerts - it is a function that send a alert by email 
 */
export const throwAlerts = async () => {
	let alerts = await mongo.alerts.find().populate('user');
	
	alerts = alerts.filter(({ latest_send, logtime }) => {
		const date = new Date(latest_send);
		const now = new Date(Date.now());
		const timeDiff = Math.abs(now.getTime() - date.getTime());
		const diffMinutes = Math.ceil(timeDiff / (1000 * 60)); 
		return diffMinutes >= logtime;
	});

	let promises = alerts.map(async ({ _id, keywords }) => {
		const products = await ebay.getProducts(keywords);
		return ({ _id, products: products.item });
	});

	const response = await Promise.all(promises);
	
	alerts.forEach(alert => {
		let products = response.find(list => list._id === alert._id).products;
		
		products = products.sort((a, b) => {
			const aPrice = a.sellingStatus[0].currentPrice[0].__value__;
			const bPrice = b.sellingStatus[0].currentPrice[0].__value__;
			if(aPrice === bPrice) return 0;
			return aPrice > bPrice ? 1 : -1;
		});

		products = products.map(product => {
			return {
				title: product.title[0],
				image: product.galleryURL[0],
				price: product.sellingStatus[0].currentPrice[0].__value__
			};
		});

		mail.sendAlert({ from: alert.user.email, products });
		
		alert.latest_send = Date.now();
		alert.save();
	});	
};


