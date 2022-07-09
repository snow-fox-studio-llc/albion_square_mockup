import mongoose from "mongoose";
import itemSchema, { IItem } from "../schemas/item.js";

const Item = mongoose.model<IItem>("Item", itemSchema);

export const upsert = async (filter: IItem, doc: IItem) => {
	return await Item.findOneAndUpdate(filter, doc, {
		upsert: true,
	})
		.lean()
		.exec();
};

export const find = async (
	filter: IItem,
	page: number = 0,
	limit: number = 10
) => {
	return await Item.find(filter)
		.limit(limit)
		.skip(page * limit)
		.lean()
		.exec();
};

export const findCount = async (filter: IItem) => {
	return await Item.countDocuments(filter).exec();
};

export const findAll = async () => {
	return await Item.find({}).lean().exec();
};

export const findAllCount = async () => {
	return await Item.estimatedDocumentCount().exec();
};

export const search = async (
	query: string,
	filter: IItem,
	page: number = 0,
	limit: number = 10
) => {
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

export const searchCount = async (query: string, filter: IItem) => {
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

export const deleteGhosts = async (version: string) => {
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
