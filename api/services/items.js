const itemsModel = require("../models/items.js");

module.exports = {
	async find({ page, limit, ...filter }) {
		filter.hasAssetAvailable = true;
		const items = await itemsModel.find(filter, page, limit);
		let count = null;
		if (Object.keys(filter).length > 0) {
			count = await itemsModel.findCount(filter);
		} else {
			count = await itemsModel.findAllCount();
		}

		return {
			items,
			count,
			page: page || 0,
			limit: limit || 10,
		};
	},
	async search({ searchString, page, limit, ...filter }) {
		filter.hasAssetAvailable = true;
		const items = await itemsModel.search(searchString, filter, page, limit);
		let count = await itemsModel.searchCount(searchString, filter);

		return {
			items,
			count,
			page: page || 0,
			limit: limit || 10,
		};
	},
};
