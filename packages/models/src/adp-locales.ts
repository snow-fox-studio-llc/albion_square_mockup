import { model, Schema, Types } from "mongoose";

export interface IADPLocale {
	_id?: Types.ObjectId;
	"@tuid"?: string;
	tuv?: any;
	[x: string]: any;
}

const adpLocaleSchema = new Schema<IADPLocale>(
	{
		"@tuid": {
			type: String,
			unique: true,
			required: true,
		},
		tuv: {
			type: Object,
			required: true,
		},
	},
	{ strict: false }
);

const ADPLocale = model<IADPLocale>("ADPLocale", adpLocaleSchema);

export default {
	create: async (adpLocale: IADPLocale): Promise<void> => {
		await ADPLocale.create(adpLocale);
	},
	findItemLocale: async (uniqueName: string): Promise<IADPLocale> => {
		return await ADPLocale.findOne({ "@tuid": `@ITEMS_${uniqueName}` })
			.lean()
			.exec();
	},
	findShopCategoryById: async (id: string): Promise<IADPLocale> => {
		return await ADPLocale.findOne({
			"@tuid": `@MARKETPLACEGUI_ROLLOUT_SHOPCATEGORY_${id.toUpperCase()}`,
		})
			.lean()
			.exec();
	},
	findShopSubCategoryById: async (id: string): Promise<IADPLocale> => {
		return await ADPLocale.findOne({
			"@tuid": `@MARKETPLACEGUI_ROLLOUT_SHOPSUBCATEGORY_${id.toUpperCase()}`,
		})
			.lean()
			.exec();
	},
	findItemQualityByNumber: async (quality: number): Promise<IADPLocale> => {
		return await ADPLocale.findOne({
			"@tuid": `@ITEMDETAILS_STATS_QUALITY_${quality}`,
		})
			.lean()
			.exec();
	},
	findMarketplaceRollouts: async (): Promise<IADPLocale> => {
		return await ADPLocale.find({
			"@tuid": { $regex: /@MARKETPLACEGUI_ROLLOUT_DEFAULT/gm },
		})
			.lean()
			.exec();
	},
	drop: async (): Promise<void> => {
		await ADPLocale.collection.drop();
	},
	init: async (): Promise<void> => {
		await ADPLocale.createCollection();
	},
};
