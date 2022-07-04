import mongoose from "mongoose";
import itemSchema from "../schemas/item";

const Item = mongoose.model("Item", itemSchema);

export const upsert = async (filter, doc) => {
	return await Item.findOneAndUpdate(filter, doc, {
		upsert: true,
	});
};
export const find = async (filter, page = 0, limit = 10) => {
	return await Item.find(filter)
		.limit(limit)
		.skip(page * limit)
		.lean()
		.exec();
};
export const findCount = async (filter) => {
	return await Item.countDocuments(filter).exec();
};
export const findAll = async () => {
	return await Item.find({}).lean().exec();
};
export const findAllCount = async () => {
	return await Item.estimatedDocumentCount().exec();
};
export const search = async (query, filter, page = 0, limit = 10) => {
	return await Item.aggregate()
		.search({
			index: "default",
			text: {
				path: ["en"],
				query: query,
				fuzzy: {},
			},
		})
		.match(filter)
		.skip(page * limit)
		.limit(limit)
		.exec();
};
export const searchCount = async (query, filter) => {
	return (
		await Item.aggregate()
			.search({
				index: "default",
				text: {
					path: ["en"],
					query: query,
					fuzzy: {},
				},
			})
			.match(filter)
			.count("count")
			.exec()
	)[0].count;
};
export const deleteGhosts = async (version) => {
	return await Item.deleteMany({ version: { $ne: version } });
};

export default {
	upsert,
	find,
	findCount,
	findAll,
	findAllCount,
	search,
	searchCount,
	deleteGhosts,
};
