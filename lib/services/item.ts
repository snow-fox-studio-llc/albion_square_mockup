import itemModel from "../models/item";

export const find = async ({ page, limit, ...filter }) => {
	filter.hasAsset = true;
	const items = await itemModel.find(filter, page, limit);
	let count;
	if (Object.keys(filter).length > 0) {
		count = await itemModel.findCount(filter);
	} else {
		count = await itemModel.findAllCount();
	}

	return {
		items,
		count,
		page: page || 0,
		limit: limit || 10,
	};
};

export const search = async ({ query, page, limit, ...filter }) => {
	filter.hasAsset = true;
	const items = await itemModel.search(query, filter, page, limit);
	let count = await itemModel.searchCount(query, filter);

	return {
		items,
		count,
		page: page || 0,
		limit: limit || 10,
	};
};

export default {
	find,
	search,
};
