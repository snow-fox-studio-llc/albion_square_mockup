import { model } from "mongoose";
import itemSchema, { IItem } from "@as/schemas/item";
import PaginatedModelOutput from "./paginated-model-output";

const Item = model<IItem>("Item", itemSchema);

export default {
	upsert: async (item: IItem): Promise<void> => {
		const filter: IItem = {
			uniqueName: item.uniqueName,
			tier: item.tier,
			enchantment: item.enchantment,
			quality: item.quality,
		};

		await Item.findOneAndUpdate(filter, item, { upsert: true }).exec();
	},
	findOne: async (filter: IItem): Promise<IItem> => {
		return await Item.findOne(filter).lean().exec();
	},
	find: async (
		filter: IItem,
		limit: number,
		page: number
	): Promise<PaginatedModelOutput<IItem>> => {
		const output: IItem[] = await Item.find(filter)
			.limit(limit)
			.skip(page * limit)
			.lean()
			.exec();
		const totalHits = await Item.countDocuments(filter).lean().exec();
		const totalPages = totalHits / limit;
		return { output, totalHits, totalPages };
	},
	search: async (
		query: string,
		lang: string,
		filter: IItem,
		limit: number,
		page: number
	): Promise<PaginatedModelOutput<IItem>> => {
		const output = await Item.aggregate()
			.search({
				index: "default",
				text: {
					path: [lang],
					query: query,
					fuzzy: {},
				},
			})
			.match(filter)
			.count("totalHits")
			.skip(page * limit)
			.limit(limit)
			.exec();
		console.log(output);
		return { output: [], totalHits: 0, totalPages: 0 };
	},
	deleteGhosts: async (version: IItem["version"]): Promise<void> => {
		await Item.deleteMany({ version: { $ne: version } });
	},
};
