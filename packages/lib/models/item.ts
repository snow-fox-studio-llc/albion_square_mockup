import mongoose from "mongoose";
import itemSchema, { IItem } from "../schemas/item.js";

const Item = mongoose.model<IItem>("Item", itemSchema);

export default {
	upsert: async (filter: IItem, doc: IItem) => {
		return await Item.findOneAndUpdate(filter, doc, {
			upsert: true,
		})
			.lean()
			.exec();
	},
	find: async (filter: IItem, page: number = 0, limit: number = 10) => {
		return await Item.find(filter)
			.limit(limit)
			.skip(page * limit)
			.lean()
			.exec();
	},
	findCount: async (filter: IItem) => {
		return await Item.countDocuments(filter).exec();
	},
	findAll: async () => {
		return await Item.find({}).lean().exec();
	},
	findAllCount: async () => {
		return await Item.estimatedDocumentCount().exec();
	},
	search: async (
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
	},
	searchCount: async (query: string, filter: IItem) => {
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
	},
	deleteGhosts: async (version: string) => {
		return await Item.deleteMany({ version: { $ne: version } });
	},
};
