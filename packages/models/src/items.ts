import { model, Schema, Types } from "mongoose";
import PaginatedResults from "#internal/paginated-results";

export interface IItem {
	_id?: Types.ObjectId;
	uniqueName?: string;
	shopCategory?: string;
	shopSubCategory?: string;
	tier?: number;
	enchantment?: number;
	quality?: number;
	hasAsset?: boolean | null;
	version?: string;
	enchantments?: number[];
	maxQuality?: number;
	en?: string;
	de?: string;
	fr?: string;
	ru?: string;
	pl?: string;
	es?: string;
	pt?: string;
	zh?: string;
	ko?: string;
}

const itemSchema = new Schema<IItem>({
	uniqueName: {
		type: String,
		required: true,
	},
	shopCategory: {
		type: String,
		required: true,
	},
	shopSubCategory: {
		type: String,
		required: true,
	},
	tier: {
		type: Number,
		required: true,
	},
	enchantment: {
		type: Number,
		required: true,
	},
	quality: {
		type: Number,
		required: true,
	},
	hasAsset: {
		type: Boolean,
		default: null,
	},
	version: {
		type: String,
		required: true,
	},
	enchantments: {
		type: [Number],
		required: true,
	},
	maxQuality: {
		type: Number,
		required: true,
	},
	en: {
		type: String,
		required: true,
	},
	de: {
		type: String,
		required: true,
	},
	fr: {
		type: String,
		required: true,
	},
	ru: {
		type: String,
		required: true,
	},
	pl: {
		type: String,
		required: true,
	},
	es: {
		type: String,
		required: true,
	},
	pt: {
		type: String,
		required: true,
	},
	zh: {
		type: String,
		required: true,
	},
	ko: {
		type: String,
		required: true,
	},
});

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
	find: async (filter: IItem): Promise<IItem[]> => {
		return await Item.find(filter).lean().exec();
	},
	findAtPage: async (
		filter: IItem,
		limit: number,
		page: number
	): Promise<PaginatedResults<IItem>> => {
		const output: IItem[] = await Item.find(filter)
			.limit(limit)
			.skip(page * limit)
			.lean()
			.exec();
		const totalHits = await Item.countDocuments(filter).lean().exec();
		const totalPages = totalHits / limit;
		return { output, totalHits, totalPages };
	},
	findAll: async (): Promise<IItem[]> => {
		return await Item.find({}).lean().exec();
	},
	search: async (
		query: string,
		lang: string,
		filter: IItem
	): Promise<IItem[]> => {
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
			.exec();
		console.log(output);
		return output;
	},
	searchAtPage: async (
		query: string,
		lang: string,
		filter: IItem,
		limit: number,
		page: number
	): Promise<PaginatedResults<IItem>> => {
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
