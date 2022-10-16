import { model } from "mongoose";
import adpLocaleSchema, { IADPLocale } from "@as/schemas/adp-locale";

const ADPLocale = model("ADPLocale", adpLocaleSchema);

export default {
	create: async (adpLocale: IADPLocale): Promise<void> => {
		await ADPLocale.create(adpLocale);
	},
	findItemLocale: async (uniqueName: string): Promise<IADPLocale> => {
		return await ADPLocale.findOne({ "@tuid": `@ITEMS_${uniqueName}` })
			.lean()
			.exec();
	},
	async findShopCategoryById (id: string): Promise<IADPLocale> {
		return await ADPLocale
			.findOne({
				"@tuid": `@MARKETPLACEGUI_ROLLOUT_SHOPCATEGORY_${id.toUpperCase()}`,
			})
			.lean()
			.exec();
	},
	async findShopSubCategoryById(id: string): Promise<IADPLocale> {
		return await ADPLocale
			.findOne({
				"@tuid": `@MARKETPLACEGUI_ROLLOUT_SHOPSUBCATEGORY_${id.toUpperCase()}`,
			})
			.lean()
			.exec();
	},
	async findItemQualityByNumber(quality: number): Promise<IADPLocale> {
		return await ADPLocale
			.findOne({
				"@tuid": `@ITEMDETAILS_STATS_QUALITY_${quality}`,
			})
			.lean()
			.exec();
	},
	async findMarketplaceRollouts(): Promise<IADPLocale> {
		return await ADPLocale
			.find({
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
