import { model } from "mongoose";
import itemSchema, { IItem, IItemLeanDoc } from "@as/schemas/item";

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
	findOne: async (filter: IItem): Promise<IItemLeanDoc> => {
		return await Item.findOne(filter).lean().exec();
	},
	find: async (
		filter: IItem,
		limit: number,
		page: number
	): Promise<IItemLeanDoc[]> => {
		return await Item.find(filter).limit(limit).skip(page * limit).lean().exec();;
	},
	search: async (
		query: string,
		lang: string,
		filter: IItem,
		limit: number,
		page: number
	): Promise<IItemLeanDoc[]> => {
		return await Item.aggregate()
			.search({
				index: "default",
				text: {
					path: [lang],
					query: query,
					fuzzy: {},
				},
			})
			.match(filter)
			.skip(page * limit)
			.limit(limit)
			.exec();
	},
	deleteGhosts: async (version: IItem["version"]): Promise<void> => {
		await Item.deleteMany({ version: { $ne: version } });
	},
};
